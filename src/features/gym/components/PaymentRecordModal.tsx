// src/features/gym/components/PaymentRecordModal.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
import { useAppStore } from '../../../shared/stores/useAppStore';
import { useGymStore } from '../stores/useGymStore';
import { useUserRole } from '../../../shared/hooks/useUserRole';
import { paymentService } from '../../../shared/services/PaymentService';
import { gymMemberRepository } from '../../../shared/services/repositories/GymMemberRepository';
import { gymRepository } from '../../../shared/services/repositories/GymRepository';
import { ThemeView } from '../../../shared/ui/ThemeView';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { Ionicons } from '@expo/vector-icons';
import { PaymentRecord, PaymentMethod, PaymentStatus, GymPackage, UpdatePaymentDTO } from '../../../shared/types/domain/core/gym';
import { GymMember } from '../../../shared/types/domain/core/gym';
import DateTimePicker from '@react-native-community/datetimepicker';

interface PaymentRecordModalProps {
  visible: boolean;
  onClose: () => void;
  payment?: PaymentRecord;
  memberId?: string;
  onSuccess?: (payment: PaymentRecord) => void;
}

// Products and Services options
const PRODUCTS_AND_SERVICES = [
  { id: 'protein_powder', name: 'Protein Powder' },
  { id: 'creatine', name: 'Creatine' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'others', name: 'Others' },
];

// Discount options
const DISCOUNT_OPTIONS = [
  { label: 'N/A', value: 0 },
  { label: '5%', value: 5 },
  { label: '10%', value: 10 },
  { label: '20%', value: 20 },
  { label: '50%', value: 50 },
];

export const PaymentRecordModal: React.FC<PaymentRecordModalProps> = ({
  visible,
  onClose,
  payment,
  memberId,
  onSuccess,
}) => {
  const { theme } = useEnhancedTheme();
  const { user } = useAppStore();
  const { currentGym } = useGymStore();
  const { currentGymRole } = useUserRole();
  
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [members, setMembers] = useState<GymMember[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMembers, setFilteredMembers] = useState<GymMember[]>([]);
  const [showMemberDropdown, setShowMemberDropdown] = useState(false);
  
  // Form state
  const [selectedMember, setSelectedMember] = useState<GymMember | null>(null);
  const [amount, setAmount] = useState('');
  const [originalAmount, setOriginalAmount] = useState(0);
  const [method, setMethod] = useState<PaymentMethod>('cash');
  const [paymentDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  
  // Package-related state
  const [availablePackages, setAvailablePackages] = useState<GymPackage[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<GymPackage | null>(null);
  const [startDate, setStartDate] = useState(new Date());
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<'start' | null>(null);
  
  // New state for additional features
  const [discount, setDiscount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  
  const isEditMode = !!payment;
  const canEdit = currentGymRole === 'owner';
  const isOwner = currentGymRole === 'owner';

  // Debug log for selected package changes
  useEffect(() => {
    console.log('Selected Package Updated:', selectedPackage?.name || 'null/undefined');
  }, [selectedPackage]);

  // Debug log for selected product changes
  useEffect(() => {
    console.log('Selected Product Updated:', selectedProduct || 'null');
  }, [selectedProduct]);

  // Debug log for discount changes
  useEffect(() => {
    console.log('Discount Updated:', discount);
  }, [discount]);

  // Load members and packages when modal opens
  useEffect(() => {
    if (visible && currentGym?.id) {
      if (!memberId) {
        loadMembers();
      }
      loadPackages();
      // Reset form for new payment
      if (!isEditMode) {
        resetForm();
      }
    }
  }, [visible, currentGym?.id, memberId]);

  // If editing, populate form
  useEffect(() => {
    if (payment && visible) {
      setAmount(payment.amount.toString());
      setOriginalAmount(payment.originalAmount || payment.amount);
      setMethod(payment.method);
      setNotes(payment.notes || '');
      setDiscount(payment.discountPercentage || 0);
      
      // Load member details
      loadMemberDetails(payment.memberId);
      
      // Load package if exists
      if (payment.packageId && payment.packageId !== 'products_services') {
        const pkg = availablePackages.find(p => p.id === payment.packageId);
        if (pkg) {
          setSelectedPackage(pkg);
          // Calculate dates from payment data
          setStartDate(new Date(payment.periodStart));
          if (payment.periodEnd) {
            setExpiryDate(new Date(payment.periodEnd));
          }
        }
      } else if (payment.packageId === 'products_services') {
        setSelectedProduct(payment.packageName?.toLowerCase().replace(' ', '_') || 'others');
      }
    }
    
    if (memberId && visible && !payment) {
      loadMemberDetails(memberId);
    }
  }, [payment, memberId, visible, availablePackages]);

  // When member changes, update start date logic
  useEffect(() => {
    if (selectedMember && !isEditMode) {
      const today = new Date();
      
      if (selectedMember.expiryDate) {
        const expiry = new Date(selectedMember.expiryDate);
        // Default start date: max(today, expiry) for renewals
        const newStartDate = expiry > today ? expiry : today;
        setStartDate(newStartDate);
        
        // Calculate expiry if package is selected
        if (selectedPackage && selectedPackage.durationDays > 0) {
          const newExpiryDate = new Date(newStartDate);
          newExpiryDate.setDate(newExpiryDate.getDate() + selectedPackage.durationDays);
          setExpiryDate(newExpiryDate);
        }
      } else {
        setStartDate(today);
        if (selectedPackage && selectedPackage.durationDays > 0) {
          const newExpiryDate = new Date(today);
          newExpiryDate.setDate(newExpiryDate.getDate() + selectedPackage.durationDays);
          setExpiryDate(newExpiryDate);
        }
      }
      
      // If member has current package, pre-select it
      if (selectedMember.currentPackage && !isEditMode) {
        const matchingPackage = availablePackages.find(
          p => p.id === selectedMember.currentPackage?.id
        );
        if (matchingPackage) {
          setSelectedPackage(matchingPackage);
          updateAmountAndDates(matchingPackage);
        }
      }
    }
  }, [selectedMember, availablePackages, isEditMode]);

  // When package changes, update dates and amount
  useEffect(() => {
    if (selectedPackage && selectedMember && !isEditMode) {
      updateAmountAndDates(selectedPackage);
    }
  }, [selectedPackage, startDate, isEditMode]);

  // Search filter with debounce
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredMembers([]);
      setShowMemberDropdown(false);
      return;
    }
    
    setShowMemberDropdown(true);
    
    const term = searchTerm.toLowerCase();
    const filtered = members.filter(member => {
      const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
      const memberCode = member.memberCode?.toLowerCase() || '';
      const phone = member.phoneNumber?.toLowerCase() || '';
      return fullName.includes(term) || memberCode.includes(term) || phone.includes(term);
    });
    
    setFilteredMembers(filtered);
  }, [searchTerm, members]);

  const loadMembers = async () => {
    if (!currentGym?.id) return;
    
    setSearching(true);
    try {
      const gymMembers = await gymMemberRepository.getMembersByGym(currentGym.id);
      setMembers(gymMembers);
    } catch (error) {
      console.error('Error loading members:', error);
      Alert.alert('Error', 'Failed to load members');
    } finally {
      setSearching(false);
    }
  };

  const loadPackages = () => {
    if (!currentGym?.packages) return;
    
    const activePackages = currentGym.packages.filter(pkg => pkg.isActive);
    setAvailablePackages(activePackages);
  };

  const loadMemberDetails = async (memberId: string) => {
    try {
      const member = await gymMemberRepository.getById(memberId);
      if (member) {
        setSelectedMember(member);
        setShowMemberDropdown(false);
      }
    } catch (error) {
      console.error('Error loading member:', error);
    }
  };

  const resetForm = () => {
    setSelectedMember(null);
    setAmount('');
    setOriginalAmount(0);
    setMethod('cash');
    setNotes('');
    setSelectedPackage(null);
    setStartDate(new Date());
    setExpiryDate(null);
    setDiscount(0);
    setSelectedProduct(null);
    setSearchTerm('');
    setShowMemberDropdown(false);
  };

  const handlePackageSelect = (pkg: GymPackage) => {
    console.log(`Selecting package: ${pkg.name}, ID: ${pkg.id}`);
    setSelectedPackage(pkg);
    setSelectedProduct(null);
    setDiscount(0); // Reset discount when package changes
    setOriginalAmount(0); // Reset original amount
    
    if (!isEditMode || isOwner) {
      updateAmountAndDates(pkg);
    }
  };

  const handleProductSelect = (productId: string) => {
    console.log(`Selecting product: ${productId}`);
    setSelectedProduct(productId);
    setSelectedPackage(null); // Set to null, not undefined
    setDiscount(0); // Reset discount when product changes
    setOriginalAmount(0); // Reset original amount
    setShowProductsDropdown(false);
    
    if (!isEditMode || isOwner) {
      setAmount(''); // Let user enter custom amount for products
      setExpiryDate(null);
    }
  };

  const updateAmountAndDates = (pkg: GymPackage) => {
    // Set amount (only if not editing or owner is editing)
    if (!isEditMode || isOwner) {
      const packagePrice = pkg.price;
      setAmount(packagePrice.toString());
      setOriginalAmount(packagePrice);
    }
    
    // Calculate expiry date: startDate + durationDays
    if (pkg.durationDays > 0 && (!isEditMode || isOwner)) {
      const calculatedExpiryDate = new Date(startDate);
      calculatedExpiryDate.setDate(calculatedExpiryDate.getDate() + pkg.durationDays);
      setExpiryDate(calculatedExpiryDate);
    } else if (!pkg.durationDays) {
      setExpiryDate(null);
    }
  };

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
    setShowDatePicker(null);
    
    // Recalculate expiry date if a package is selected
    if (selectedPackage && selectedPackage.durationDays > 0 && (!isEditMode || isOwner)) {
      const newExpiryDate = new Date(date);
      newExpiryDate.setDate(newExpiryDate.getDate() + selectedPackage.durationDays);
      setExpiryDate(newExpiryDate);
    }
  };

  const calculateDiscountedAmount = (baseAmount: number) => {
    if (discount > 0) {
      return baseAmount - (baseAmount * discount / 100);
    }
    return baseAmount;
  };

  const isAmountEditable = () => {
    if (isEditMode && !isOwner) return false;
    if (selectedProduct) return true; // Products are always editable
    if (discount > 0) return true; // Discounted packages are editable
    if (!selectedPackage) return true; // No package selected
    return false; // Package without discount, not editable
  };

  const handleSubmit = async () => {
    if (!currentGym?.id || !user?.id) {
      Alert.alert('Error', 'Missing required information');
      return;
    }

    if (!selectedMember) {
      Alert.alert('Validation', 'Please select a member');
      return;
    }

    // ✅ Calculate base amount from input
    const inputAmount = parseFloat(amount);
    const baseAmount = isNaN(inputAmount) ? originalAmount || 0 : inputAmount;
    
    // ✅ Calculate final amount with discount
    const finalAmount = discount > 0 ? 
      calculateDiscountedAmount(baseAmount) : 
      baseAmount;

    if (isNaN(finalAmount) || finalAmount <= 0) {
      Alert.alert('Validation', 'Please enter a valid amount');
      return;
    }

    // Validate notes if discount applied
    if (discount > 0 && !notes.trim()) {
      Alert.alert('Validation', 'Notes are required when applying a discount');
      return;
    }

    // For package payments, validate amount matches package price (with discount)
    if (selectedPackage && !selectedProduct && discount === 0) {
      const packagePrice = selectedPackage.price;
      const isAmountValid = Math.abs(baseAmount - packagePrice) <= 1; // Allow 1 NPR difference
      
      if (!isAmountValid && (!isEditMode || isOwner)) {
        Alert.alert(
          'Amount Mismatch',
          `Package price is NPR ${packagePrice.toLocaleString()}. Do you want to proceed with NPR ${baseAmount.toLocaleString()}?`,
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Proceed', 
              onPress: () => submitPaymentWithAmount(finalAmount, baseAmount),
              style: 'default'
            }
          ]
        );
        return;
      }
    }

    submitPaymentWithAmount(finalAmount, baseAmount);
  };

  const submitPaymentWithAmount = async (finalAmount: number, baseAmountInput?: number) => {
    setLoading(true);
    
    try {
      // ✅ Check if selectedMember exists
      if (!selectedMember) {
        Alert.alert('Error', 'Please select a member');
        setLoading(false);
        return;
      }

      // Determine base amount (for discount tracking)
      const baseAmount = baseAmountInput || originalAmount || finalAmount;

      // ✅ Create payment record WITH DISCOUNTED AMOUNT
      const paymentData = {
        gymId: currentGym!.id,
        memberId: selectedMember.id,
        userId: user!.id,
        amount: finalAmount, // ✅ Use finalAmount (already discounted if applicable)
        method,
        paymentDate: new Date(), // Always today's date
        dueDate: expiryDate || new Date(),
        periodStart: startDate,
        periodEnd: expiryDate || startDate,
        notes: notes.trim() || undefined,
        status: 'completed' as PaymentStatus,
      };

      // Add package or product info
      if (selectedPackage) {
        Object.assign(paymentData, {
          packageId: selectedPackage.id,
          packageName: selectedPackage.name,
        });
      } else if (selectedProduct) {
        const productName = PRODUCTS_AND_SERVICES.find(p => p.id === selectedProduct)?.name || 'Others';
        Object.assign(paymentData, {
          packageId: 'products_services',
          packageName: productName,
        });
      }

      // Add discount info
      if (discount > 0) {
        Object.assign(paymentData, {
          discountPercentage: discount,
          originalAmount: baseAmount, // Store the original amount before discount
        });
        // Append discount info to notes
        if (paymentData.notes) {
          paymentData.notes = `Discount: ${discount}%\n${paymentData.notes}`;
        } else {
          paymentData.notes = `Discount: ${discount}%`;
        }
      }

      let result;
      
      if (isEditMode && payment) {
        // ✅ COMPLETE UpdatePaymentDTO with all fields
        const updateData: UpdatePaymentDTO = {
          amount: finalAmount, // ✅ Use finalAmount
          method,
          paymentDate: new Date(), // Always update to current date when editing
          dueDate: expiryDate || new Date(),
          periodStart: startDate,
          periodEnd: expiryDate || startDate,
          notes: paymentData.notes,
          status: 'completed',
          
          // Package info
          packageId: selectedPackage ? selectedPackage.id : 
                    selectedProduct ? 'products_services' : undefined,
          packageName: selectedPackage ? selectedPackage.name : 
                      selectedProduct ? PRODUCTS_AND_SERVICES.find(p => p.id === selectedProduct)?.name : undefined,
          
          // Discount info
          discountPercentage: discount > 0 ? discount : undefined,
          originalAmount: discount > 0 ? baseAmount : undefined,
        };
  
        console.log('📤 Sending update data:', updateData);
        
        result = await paymentService.updatePayment(
          payment.id,
          updateData,
          user!.id,
          currentGymRole || 'member'
        );
        
        Alert.alert('Success', 'Payment updated successfully');
      } else {
        // Create new payment
        result = await paymentService.createPayment(
          paymentData as any,
          currentGymRole || 'member'
        );
        
        // ✅ Assign package for new payments WITH NULL CHECK
        if (selectedPackage && !selectedProduct && !isEditMode && selectedMember) {
          try {
            await gymMemberRepository.assignOrRenewPackage(
              selectedMember.id,
              selectedPackage,
              startDate,
              selectedMember.currentPackage?.id === selectedPackage.id
            );
          } catch (error) {
            console.error('❌ Error assigning package:', error);
          }
        }
        
        Alert.alert('Success', 'Payment recorded successfully');
      }
      
      onSuccess?.(result);
      onClose();
    } catch (error: any) {
      console.error('Error submitting payment:', error);
      Alert.alert('Error', error.message || 'Failed to save payment');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    if (!payment) return;
    
    Alert.alert(
      'Delete Payment',
      'Are you sure you want to delete this payment? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              await paymentService.deletePayment(payment.id, currentGymRole || 'member');
              Alert.alert('Success', 'Payment deleted successfully');
              onClose();
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Failed to delete payment');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const renderMemberSearch = () => (
    <View style={{ marginBottom: 24 }}>
      <ThemeText style={{
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text.primary,
        marginBottom: 12,
      }}>
        Select Member *
      </ThemeText>
      
      {/* Search Bar */}
      <View style={{
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 8,
        marginBottom: 12,
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingVertical: 8,
        }}>
          <Ionicons name="search" size={20} color={theme.colors.text.secondary} />
          <TextInput
            style={{
              flex: 1,
              marginLeft: 8,
              fontSize: 16,
              color: theme.colors.text.primary,
              paddingVertical: 8,
            }}
            placeholder="Search by name, code, or phone..."
            placeholderTextColor={theme.colors.text.secondary}
            value={searchTerm}
            onChangeText={(text) => {
              setSearchTerm(text);
              if (text.trim()) {
                setShowMemberDropdown(true);
              }
            }}
            onFocus={() => {
              if (searchTerm.trim()) {
                setShowMemberDropdown(true);
              }
            }}
            editable={!isEditMode || isOwner}
          />
          {searchTerm && (
            <TouchableOpacity onPress={() => {
              setSearchTerm('');
              setShowMemberDropdown(false);
            }}>
              <Ionicons name="close-circle" size={20} color={theme.colors.text.secondary} />
            </TouchableOpacity>
          )}
        </View>
        
        {/* Member Dropdown - Only shown when searching */}
        {showMemberDropdown && (!isEditMode || isOwner) && (
          <View style={{
            maxHeight: 200,
            borderTopWidth: 1,
            borderTopColor: theme.colors.border,
          }}>
            <ScrollView>
              {searching ? (
                <View style={{ padding: 20 }}>
                  <ActivityIndicator size="small" color={theme.colors.primary} />
                </View>
              ) : filteredMembers.length === 0 ? (
                <View style={{ padding: 20, alignItems: 'center' }}>
                  <ThemeText style={{ color: theme.colors.text.secondary }}>
                    No members found
                  </ThemeText>
                </View>
              ) : (
                filteredMembers.map(member => (
                  <TouchableOpacity
                    key={member.id}
                    style={{
                      padding: 16,
                      borderBottomWidth: 1,
                      borderBottomColor: theme.colors.border,
                      backgroundColor: selectedMember?.id === member.id 
                        ? `${theme.colors.primary}10` 
                        : 'transparent',
                    }}
                    onPress={() => {
                      setSelectedMember(member);
                      setSearchTerm('');
                      setShowMemberDropdown(false);
                    }}
                  >
                    <ThemeText style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: theme.colors.text.primary,
                      marginBottom: 4,
                    }}>
                      {member.firstName} {member.lastName}
                    </ThemeText>
                    <ThemeText style={{
                      fontSize: 12,
                      color: theme.colors.text.secondary,
                    }}>
                      {member.memberCode} • {member.phoneNumber}
                    </ThemeText>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </View>
        )}
      </View>
      
      {/* Selected Member Card */}
      {selectedMember && (
        <View style={{
          backgroundColor: `${theme.colors.primary}10`,
          padding: 12,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: `${theme.colors.primary}30`,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: theme.colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}>
              <ThemeText style={{ color: '#FFFFFF', fontWeight: '600' }}>
                {selectedMember.firstName.charAt(0)}{selectedMember.lastName.charAt(0)}
              </ThemeText>
            </View>
            <View style={{ flex: 1 }}>
              <ThemeText style={{
                fontSize: 16,
                fontWeight: '600',
                color: theme.colors.text.primary,
                marginBottom: 2,
              }}>
                {selectedMember.firstName} {selectedMember.lastName}
              </ThemeText>
              <ThemeText style={{
                fontSize: 12,
                color: theme.colors.text.secondary,
              }}>
                {selectedMember.memberCode} • {selectedMember.phoneNumber}
              </ThemeText>
            </View>
            {(isEditMode && isOwner) && (
              <TouchableOpacity onPress={() => setSelectedMember(null)}>
                <Ionicons name="close-circle" size={20} color={theme.colors.text.secondary} />
              </TouchableOpacity>
            )}
          </View>
          
          {selectedMember.currentPackage && (
            <ThemeText style={{
              fontSize: 12,
              color: theme.colors.semantic.info,
              marginTop: 4,
            }}>
              Current: {selectedMember.currentPackage.name} • 
              Expires: {selectedMember.expiryDate ? new Date(selectedMember.expiryDate).toLocaleDateString() : 'N/A'}
            </ThemeText>
          )}
        </View>
      )}
    </View>
  );

  const renderPackageSelection = () => {
    // In edit mode, non-owners can only view, not change
    const canChangePackage = !isEditMode || isOwner;
    
    return (
      <View style={{ marginBottom: 24 }}>
        <ThemeText style={{
          fontSize: 16,
          fontWeight: '600',
          color: theme.colors.text.primary,
          marginBottom: 12,
        }}>
          Select Package or Product {canChangePackage ? '*' : ''}
        </ThemeText>
      
        {/* Package Cards - Removed "Gym Packages" title */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', gap: 8, paddingHorizontal: 4 }}>
            {availablePackages.map((pkg) => (
              <TouchableOpacity
                key={pkg.id}
                style={{
                  minWidth: 120,
                  padding: 12,
                  backgroundColor: selectedPackage?.id === pkg.id 
                    ? theme.colors.primary
                    : theme.colors.card,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: selectedPackage?.id === pkg.id 
                    ? theme.colors.primary
                    : theme.colors.border,
                  alignItems: 'center',
                  opacity: canChangePackage ? 1 : 0.7,
                }}
                onPress={() => canChangePackage && handlePackageSelect(pkg)}
                disabled={!canChangePackage}
              >
                <Ionicons 
                  name="cube"
                  size={20}
                  color={selectedPackage?.id === pkg.id ? '#FFFFFF' : theme.colors.text.primary}
                />
                <ThemeText style={{
                  fontSize: 12,
                  fontWeight: '600',
                  marginTop: 4,
                  color: selectedPackage?.id === pkg.id ? '#FFFFFF' : theme.colors.text.primary,
                  textAlign: 'center',
                }}>
                  {pkg.name}
                </ThemeText>
                <ThemeText style={{
                  fontSize: 10,
                  color: selectedPackage?.id === pkg.id ? '#FFFFFF' : theme.colors.text.secondary,
                  textAlign: 'center',
                  marginTop: 2,
                }}>
                  NPR {pkg.price.toLocaleString()}
                </ThemeText>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      
        {/* Products & Services */}
        <TouchableOpacity
          style={{
            backgroundColor: selectedProduct ? theme.colors.primary : theme.colors.card,
            padding: 12,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: selectedProduct ? theme.colors.primary : theme.colors.border,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            opacity: canChangePackage ? 1 : 0.7,
          }}
          onPress={() => canChangePackage && setShowProductsDropdown(!showProductsDropdown)}
          disabled={!canChangePackage}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons 
              name="cart"
              size={20}
              color={selectedProduct ? '#FFFFFF' : theme.colors.text.primary}
            />
            <ThemeText style={{
              fontSize: 14,
              fontWeight: '600',
              marginLeft: 8,
              color: selectedProduct ? '#FFFFFF' : theme.colors.text.primary,
            }}>
              {selectedProduct 
                ? PRODUCTS_AND_SERVICES.find(p => p.id === selectedProduct)?.name 
                : 'Products & Services'}
            </ThemeText>
          </View>
          {canChangePackage && (
            <Ionicons 
              name={showProductsDropdown ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={selectedProduct ? '#FFFFFF' : theme.colors.text.secondary}
            />
          )}
        </TouchableOpacity>
      
        {showProductsDropdown && canChangePackage && (
          <View style={{
            backgroundColor: theme.colors.card,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: 8,
            marginTop: 8,
            maxHeight: 200,
          }}>
            <ScrollView>
              {PRODUCTS_AND_SERVICES.map(product => (
                <TouchableOpacity
                  key={product.id}
                  style={{
                    padding: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: theme.colors.border,
                    backgroundColor: selectedProduct === product.id 
                      ? `${theme.colors.primary}10` 
                      : 'transparent',
                  }}
                  onPress={() => handleProductSelect(product.id)}
                >
                  <ThemeText style={{
                    fontSize: 14,
                    color: selectedProduct === product.id ? theme.colors.primary : theme.colors.text.primary,
                  }}>
                    {product.name}
                  </ThemeText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    );
  };

  const renderAmountSection = () => {
    const baseAmount = parseFloat(amount) || originalAmount || 0;
    const discountedAmount = discount > 0 ? 
      calculateDiscountedAmount(baseAmount) : 
      baseAmount;
    
    const amountEditable = isAmountEditable();
    
    return (
      <View style={{ marginBottom: 24 }}>
        <ThemeText style={{
          fontSize: 16,
          fontWeight: '600',
          color: theme.colors.text.primary,
          marginBottom: 12,
        }}>
          Amount (NPR) *
        </ThemeText>
        
        {/* Original Amount Display (for packages OR products with discount) */}
        {(selectedPackage || selectedProduct) && baseAmount > 0 && discount > 0 && (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <ThemeText style={{
              fontSize: 14,
              color: theme.colors.text.secondary,
              textDecorationLine: 'line-through',
            }}>
              NPR {baseAmount.toLocaleString()}
            </ThemeText>
            <ThemeText style={{
              fontSize: 14,
              color: theme.colors.warning,
              marginLeft: 8,
            }}>
              -{discount}%
            </ThemeText>
            <ThemeText style={{
              fontSize: 14,
              color: theme.colors.primary,
              marginLeft: 8,
              fontWeight: '600',
            }}>
              NPR {discountedAmount.toLocaleString()}
            </ThemeText>
          </View>
        )}
        
        {/* Amount Input */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.colors.card,
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: 8,
          paddingHorizontal: 16,
          marginBottom: 8,
        }}>
          <ThemeText style={{
            fontSize: 18,
            fontWeight: '600',
            color: theme.colors.text.primary,
            marginRight: 8,
          }}>
            रु
          </ThemeText>
          <TextInput
            style={{
              flex: 1,
              fontSize: 18,
              fontWeight: '600',
              color: theme.colors.text.primary,
              paddingVertical: 14,
            }}
            placeholder="0.00"
            placeholderTextColor={theme.colors.text.secondary}
            value={discount > 0 ? discountedAmount.toString() : amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            editable={amountEditable}
          />
        </View>
        
        {/* Payment Date Text (not in a box) */}
        <ThemeText style={{
          fontSize: 12,
          color: theme.colors.text.secondary,
          marginTop: 8,
          marginLeft: 4,
        }}>
          Payment Date: {paymentDate.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </ThemeText>
      </View>
    );
  };

  const renderDiscountSection = () => {
    const canChangeDiscount = !isEditMode || isOwner;
    
    return (
      <View style={{ marginBottom: 24 }}>
        <ThemeText style={{
          fontSize: 16,
          fontWeight: '600',
          color: theme.colors.text.primary,
          marginBottom: 12,
        }}>
          Discount
        </ThemeText>
        
        {/* Evenly distributed discount buttons */}
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between',
          gap: 8,
        }}>
          {DISCOUNT_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={{
                flex: 1,
                paddingHorizontal: 12,
                paddingVertical: 10,
                backgroundColor: discount === option.value 
                  ? theme.colors.primary 
                  : theme.colors.card,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: discount === option.value 
                  ? theme.colors.primary 
                  : theme.colors.border,
                alignItems: 'center',
                opacity: canChangeDiscount ? 1 : 0.7,
              }}
              onPress={() => canChangeDiscount && setDiscount(option.value)}
              disabled={!canChangeDiscount}
            >
              <ThemeText style={{
                fontSize: 14,
                fontWeight: '600',
                color: discount === option.value ? '#FFFFFF' : theme.colors.text.primary,
              }}>
                {option.label}
              </ThemeText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderPaymentMethod = () => {
    const canChangeMethod = !isEditMode || isOwner;
    
    return (
      <View style={{ marginBottom: 24 }}>
        <ThemeText style={{
          fontSize: 16,
          fontWeight: '600',
          color: theme.colors.text.primary,
          marginBottom: 12,
        }}>
          Payment Method *
        </ThemeText>
        
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {(['cash', 'esewa', 'khalti', 'bank_transfer', 'card'] as PaymentMethod[]).map((paymentMethod) => (
            <TouchableOpacity
              key={paymentMethod}
              style={{
                flex: 1,
                minWidth: 80,
                padding: 12,
                backgroundColor: method === paymentMethod 
                  ? theme.colors.primary 
                  : theme.colors.card,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: method === paymentMethod 
                  ? theme.colors.primary 
                  : theme.colors.border,
                alignItems: 'center',
                opacity: canChangeMethod ? 1 : 0.7,
              }}
              onPress={() => canChangeMethod && setMethod(paymentMethod)}
              disabled={!canChangeMethod}
            >
              <Ionicons 
                name={
                  paymentMethod === 'cash' ? 'cash' :
                  paymentMethod === 'esewa' ? 'phone-portrait' :
                  paymentMethod === 'khalti' ? 'card' :
                  paymentMethod === 'bank_transfer' ? 'business' :
                  'card'
                }
                size={20}
                color={method === paymentMethod ? '#FFFFFF' : theme.colors.text.primary}
              />
              <ThemeText style={{
                fontSize: 12,
                fontWeight: '600',
                marginTop: 4,
                color: method === paymentMethod ? '#FFFFFF' : theme.colors.text.primary,
                textTransform: 'capitalize',
              }}>
                {paymentMethod === 'bank_transfer' ? 'Bank' : paymentMethod.replace('_', ' ')}
              </ThemeText>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Warning Message - Moved below payment method cards */}
        <View style={{
          backgroundColor: `${theme.colors.warning}15`,
          padding: 12,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: theme.colors.warning,
          marginTop: 16,
        }}>
          <ThemeText style={{
            fontSize: 12,
            color: theme.colors.warning,
            fontWeight: '600',
          }}>
            ⚠️ IMPORTANT: Please verify payment is received. Once recorded, only owner can edit the payment.
          </ThemeText>
        </View>
      </View>
    );
  };

  const renderPackageDuration = () => {
    if (!selectedPackage) return null;
    
    const canChangeDates = !isEditMode || isOwner;
    
    return (
      <View style={{ marginBottom: 24 }}>
        <ThemeText style={{
          fontSize: 16,
          fontWeight: '600',
          color: theme.colors.text.primary,
          marginBottom: 12,
        }}>
          Package Duration
        </ThemeText>
        
        {/* Start and Expiry Dates on same row */}
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
          {/* Start Date - 50% */}
          <View style={{ flex: 1 }}>
            <ThemeText style={{
              fontSize: 14,
              color: theme.colors.text.secondary,
              marginBottom: 8,
            }}>
              Start Date *
            </ThemeText>
            
            <TouchableOpacity
              style={{
                backgroundColor: theme.colors.card,
                padding: 16,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: theme.colors.border,
                alignItems: 'center',
                opacity: canChangeDates ? 1 : 0.7,
              }}
              onPress={() => canChangeDates && setShowDatePicker('start')}
              disabled={!canChangeDates}
            >
              <ThemeText style={{
                fontSize: 16,
                color: theme.colors.text.primary,
              }}>
                {startDate.toLocaleDateString()}
              </ThemeText>
            </TouchableOpacity>
          </View>
          
          {/* Expiry Date - 50% */}
          <View style={{ flex: 1 }}>
            <ThemeText style={{
              fontSize: 14,
              color: theme.colors.text.secondary,
              marginBottom: 8,
            }}>
              Expiry Date
            </ThemeText>
            
            <View style={{
              backgroundColor: theme.colors.card,
              padding: 16,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: theme.colors.border,
            }}>
              <ThemeText style={{
                fontSize: 16,
                color: theme.colors.primary,
                fontWeight: '600',
              }}>
                {expiryDate ? expiryDate.toLocaleDateString() : 'N/A'}
              </ThemeText>
              {expiryDate && (
                <ThemeText style={{
                  fontSize: 12,
                  color: theme.colors.text.secondary,
                  marginTop: 4,
                }}>
                  {Math.ceil((expiryDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                </ThemeText>
              )}
            </View>
          </View>
        </View>
        
        {/* Date Picker - Shows below the date row */}
        {showDatePicker === 'start' && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="spinner"
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                handleStartDateChange(selectedDate);
              }
            }}
            style={{
              backgroundColor: theme.colors.background,
            }}
          />
        )}
      </View>
    );
  };

  const renderNotesSection = () => (
    <View style={{ marginBottom: 32 }}>
      <ThemeText style={{
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text.primary,
        marginBottom: 12,
      }}>
        Notes {discount > 0 ? '*' : '(Optional)'}
      </ThemeText>
      
      <TextInput
        style={{
          backgroundColor: theme.colors.card,
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: 8,
          paddingHorizontal: 16,
          paddingVertical: 12,
          fontSize: 16,
          color: theme.colors.text.primary,
          minHeight: 100,
          textAlignVertical: 'top',
        }}
        placeholder={discount > 0 ? 'Required when applying discount...' : 'Add any notes about this payment...'}
        placeholderTextColor={theme.colors.text.secondary}
        value={notes}
        onChangeText={setNotes}
        multiline
        editable={!isEditMode || isOwner}
      />
      
      {/* Notes requirement for discount - Moved here from discount section */}
      {discount > 0 && (
        <ThemeText style={{
          fontSize: 12,
          color: theme.colors.warning,
          marginTop: 8,
          marginLeft: 4,
          fontStyle: 'italic',
        }}>
          ⓘ Notes are required when applying discount
        </ThemeText>
      )}
    </View>
  );

  if (!visible) return null;

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
      presentationStyle="pageSheet"
    >
      <StatusBar 
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      
      <ThemeView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        {/* Header */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 16,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        }}>
          <TouchableOpacity 
            style={{ padding: 8 }}
            onPress={onClose}
            disabled={loading}
          >
            <Ionicons name="close" size={24} color={theme.colors.text.primary} />
          </TouchableOpacity>
          
          <ThemeText style={{
            fontSize: 18,
            fontWeight: '600',
            color: theme.colors.text.primary,
          }}>
            {isEditMode ? 'Edit Payment' : 'Record Payment'}
          </ThemeText>
          
          <View style={{ width: 40 }}>
            {isEditMode && isOwner && (
              <TouchableOpacity
                style={{ padding: 8 }}
                onPress={handleDelete}
                disabled={loading}
              >
                <Ionicons name="trash-outline" size={20} color={theme.colors.semantic.info} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView 
            style={{ flex: 1 }}
            contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Member Selection */}
            {memberId ? renderMemberSearch() : renderMemberSearch()}

            {/* Package/Product Selection - Always shown in edit mode */}
            {(!isEditMode || selectedPackage || selectedProduct || isOwner) && renderPackageSelection()}

            {/* Amount & Payment Date */}
            {renderAmountSection()}

            {/* Discount Section */}
            {(!isEditMode || discount > 0 || isOwner) && renderDiscountSection()}

            {/* Payment Method */}
            {renderPaymentMethod()}

            {/* Package Duration (only if package selected) */}
            {selectedPackage && renderPackageDuration()}

            {/* Notes */}
            {renderNotesSection()}

            {/* Submit Button */}
            <TouchableOpacity
              style={{
                backgroundColor: theme.colors.primary,
                borderRadius: 12,
                padding: 16,
                alignItems: 'center',
                opacity: loading ? 0.7 : 1,
              }}
              onPress={handleSubmit}
              disabled={loading || !selectedMember || !amount || (discount > 0 && !notes.trim())}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <ThemeText style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#FFFFFF',
                }}>
                  {isEditMode ? 'Update Payment' : 'Record Payment'}
                </ThemeText>
              )}
            </TouchableOpacity>

            {/* Edit Permission Note */}
            {isEditMode && !isOwner && (
              <ThemeText style={{
                fontSize: 12,
                color: theme.colors.semantic.info,
                textAlign: 'center',
                marginTop: 12,
                padding: 12,
                backgroundColor: `${theme.colors.semantic.info}10`,
                borderRadius: 8,
              }}>
                ⓘ Only owners can edit payments.
                Contact an owner for assistance.
              </ThemeText>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </ThemeView>
    </Modal>
  );
};

export default PaymentRecordModal;