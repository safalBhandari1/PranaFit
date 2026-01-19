// src/features/gym/components/PaymentsDashboardScreen.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
  Alert,
  Platform,
  FlatList,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
import { useUserRole } from '../../../shared/hooks/useUserRole';
import { useGymStore } from '../stores/useGymStore';
import { useAppStore } from '../../../shared/stores/useAppStore';
import { paymentService } from '../../../shared/services/PaymentService';
import { PermissionService } from '../../../shared/services/PermissionService';
import { ThemeView } from '../../../shared/ui/ThemeView';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { PaymentRecordModal } from './PaymentRecordModal';
import { PaymentRecord, PaymentStatus, PaymentMethod } from '../../../shared/types/domain/core/gym';

type TabType = 'overview' | 'all' | 'due' | 'analytics';

const PaymentsDashboardScreen: React.FC = () => {
  const { theme } = useEnhancedTheme();
  const navigation = useNavigation();
  const { currentGymRole } = useUserRole();
  const { currentGym } = useGymStore();
  const { user } = useAppStore();
  
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [overduePayments, setOverduePayments] = useState<PaymentRecord[]>([]);
  const [dueSoonPayments, setDueSoonPayments] = useState<PaymentRecord[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | undefined>();
  const [stats, setStats] = useState({
    totalRevenue: 0,
    monthlyRevenue: 0,
    overdueAmount: 0,
    dueSoonAmount: 0,
    collectionRate: 0,
    totalTransactions: 0,
  });

  const canManagePayments = PermissionService.canManagePayments(currentGymRole || 'member');

  // Load data on focus
  useFocusEffect(
    useCallback(() => {
      if (canManagePayments && currentGym?.id) {
        loadDashboardData();
      }
    }, [canManagePayments, currentGym?.id])
  );

  const loadDashboardData = async () => {
    if (!currentGym?.id) return;
    
    setLoading(true);
    try {
      // Load all data in parallel
      const [allPayments, overdue, dueSoon, summary] = await Promise.all([
        paymentService.getPaymentsByGym(currentGym.id, { limit: 50 }),
        paymentService.getOverduePayments(currentGym.id),
        paymentService.getDueSoonPayments(currentGym.id),
        paymentService.getPaymentSummary(currentGym.id, 'month'),
      ]);

      setPayments(allPayments.payments);
      setOverduePayments(overdue);
      setDueSoonPayments(dueSoon);
      setStats({
        totalRevenue: summary.totalAmount,
        monthlyRevenue: summary.totalAmount,
        overdueAmount: summary.overdueAmount,
        dueSoonAmount: dueSoon.reduce((sum, p) => sum + p.amount, 0),
        collectionRate: summary.collectionRate,
        totalTransactions: summary.totalTransactions,
      });
    } catch (error: any) {
      console.error('Error loading payment data:', error);
      Alert.alert('Error', 'Failed to load payment data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadDashboardData();
  };

  const handleRecordPayment = () => {
    setSelectedPayment(undefined);
    setShowPaymentModal(true);
  };

  const handleEditPayment = (payment: PaymentRecord) => {
    setSelectedPayment(payment);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    loadDashboardData();
    setShowPaymentModal(false);
  };

  const renderStatsCard = (title: string, value: string | number, color: string, icon: string) => (
    <View style={{
      flex: 1,
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      padding: 16,
      marginHorizontal: 4,
      minWidth: 150,
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <View style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: `${color}15`,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 8,
        }}>
          <Ionicons name={icon as any} size={18} color={color} />
        </View>
        <ThemeText style={{
          fontSize: 12,
          color: theme.colors.text.secondary,
          flex: 1,
        }}>
          {title}
        </ThemeText>
      </View>
      <ThemeText style={{
        fontSize: 20,
        fontWeight: '700',
        color: theme.colors.text.primary,
      }}>
        {typeof value === 'number' && title.includes('Revenue') ? `रु ${value.toLocaleString()}` : value}
      </ThemeText>
    </View>
  );

  const renderPaymentItem = ({ item }: { item: PaymentRecord }) => {
    const statusColor = 
      item.status === 'completed' ? theme.colors.primary :
      item.status === 'overdue' ? theme.colors.warning :
      item.status === 'due_soon' ? theme.colors.accent :
      theme.colors.text.secondary;

    return (
      <TouchableOpacity
        style={{
          backgroundColor: theme.colors.card,
          borderRadius: 12,
          padding: 16,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: theme.colors.border,
        }}
        onPress={() => canManagePayments && handleEditPayment(item)}
        disabled={!canManagePayments}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View style={{ flex: 1 }}>
            <ThemeText style={{
              fontSize: 16,
              fontWeight: '600',
              color: theme.colors.text.primary,
              marginBottom: 4,
            }}>
              रु {item.amount.toLocaleString()}
            </ThemeText>
            <ThemeText style={{
              fontSize: 12,
              color: theme.colors.text.secondary,
              textTransform: 'capitalize',
              marginBottom: 4,
            }}>
              {item.method.replace('_', ' ')}
            </ThemeText>
            <ThemeText style={{
              fontSize: 11,
              color: theme.colors.text.secondary,
            }}>
              {new Date(item.paymentDate).toLocaleDateString()}
            </ThemeText>
          </View>
          
          <View style={{
            paddingHorizontal: 8,
            paddingVertical: 4,
            backgroundColor: `${statusColor}15`,
            borderRadius: 6,
          }}>
            <ThemeText style={{
              fontSize: 10,
              fontWeight: '600',
              color: statusColor,
              textTransform: 'uppercase',
            }}>
              {item.status.replace('_', ' ')}
            </ThemeText>
          </View>
        </View>
        
        {item.notes && (
          <ThemeText style={{
            fontSize: 12,
            color: theme.colors.text.secondary,
            marginTop: 8,
            fontStyle: 'italic',
          }}>
            {item.notes}
          </ThemeText>
        )}
      </TouchableOpacity>
    );
  };

  const renderOverviewTab = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Stats Row */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 24 }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {renderStatsCard('Monthly Revenue', stats.monthlyRevenue, theme.colors.primary, 'trending-up')}
        {renderStatsCard('Collection Rate', `${stats.collectionRate}%`, theme.colors.primary, 'pie-chart')}
        {renderStatsCard('Overdue', `रु ${stats.overdueAmount.toLocaleString()}`, theme.colors.warning, 'alert-circle')}
        {renderStatsCard('Due Soon', `रु ${stats.dueSoonAmount.toLocaleString()}`, theme.colors.accent, 'time')}
      </ScrollView>

      {/* Due & Overdue Section */}
      <View style={{ marginBottom: 24 }}>
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: 16,
          paddingHorizontal: 16,
        }}>
          <ThemeText style={{
            fontSize: 18,
            fontWeight: '600',
            color: theme.colors.text.primary,
          }}>
            Due & Overdue
          </ThemeText>
          <TouchableOpacity onPress={() => setActiveTab('due')}>
            <ThemeText style={{
              fontSize: 14,
              color: theme.colors.primary,
              fontWeight: '600',
            }}>
              View All
            </ThemeText>
          </TouchableOpacity>
        </View>

        {/* Overdue Payments */}
        {overduePayments.length > 0 && (
          <View style={{ marginBottom: 20 }}>
            <ThemeText style={{
              fontSize: 14,
              fontWeight: '600',
              color: theme.colors.warning,
              marginBottom: 12,
              paddingHorizontal: 16,
            }}>
              Overdue ({overduePayments.length})
            </ThemeText>
            <FlatList
              data={overduePayments.slice(0, 3)}
              renderItem={renderPaymentItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
            />
          </View>
        )}

        {/* Due Soon Payments */}
        {dueSoonPayments.length > 0 && (
          <View style={{ marginBottom: 20 }}>
            <ThemeText style={{
              fontSize: 14,
              fontWeight: '600',
              color: theme.colors.accent,
              marginBottom: 12,
              paddingHorizontal: 16,
            }}>
              Due in 3 Days ({dueSoonPayments.length})
            </ThemeText>
            <FlatList
              data={dueSoonPayments.slice(0, 3)}
              renderItem={renderPaymentItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
            />
          </View>
        )}

        {overduePayments.length === 0 && dueSoonPayments.length === 0 && (
          <View style={{ alignItems: 'center', padding: 40 }}>
            <Ionicons name="checkmark-circle" size={48} color={theme.colors.primary} />
            <ThemeText style={{
              fontSize: 16,
              fontWeight: '600',
              color: theme.colors.text.primary,
              marginTop: 12,
            }}>
              All payments are up to date!
            </ThemeText>
          </View>
        )}
      </View>

      {/* Recent Payments */}
      <View style={{ marginBottom: 24 }}>
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: 16,
          paddingHorizontal: 16,
        }}>
          <ThemeText style={{
            fontSize: 18,
            fontWeight: '600',
            color: theme.colors.text.primary,
          }}>
            Recent Payments
          </ThemeText>
          <TouchableOpacity onPress={() => setActiveTab('all')}>
            <ThemeText style={{
              fontSize: 14,
              color: theme.colors.primary,
              fontWeight: '600',
            }}>
              View All
            </ThemeText>
          </TouchableOpacity>
        </View>

        {payments.length > 0 ? (
          <FlatList
            data={payments.slice(0, 5)}
            renderItem={renderPaymentItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          />
        ) : (
          <View style={{ alignItems: 'center', padding: 40 }}>
            <Ionicons name="receipt-outline" size={48} color={theme.colors.text.secondary} />
            <ThemeText style={{
              fontSize: 16,
              fontWeight: '600',
              color: theme.colors.text.primary,
              marginTop: 12,
            }}>
              No payments yet
            </ThemeText>
            <ThemeText style={{
              fontSize: 14,
              color: theme.colors.text.secondary,
              marginTop: 8,
              textAlign: 'center',
            }}>
              Record your first payment to get started
            </ThemeText>
          </View>
        )}
      </View>
    </ScrollView>
  );

  const renderAllPaymentsTab = () => (
    <FlatList
      data={payments}
      renderItem={renderPaymentItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16 }}
      ListEmptyComponent={
        <View style={{ alignItems: 'center', padding: 60 }}>
          <Ionicons name="receipt-outline" size={64} color={theme.colors.text.secondary} />
          <ThemeText style={{
            fontSize: 18,
            fontWeight: '600',
            color: theme.colors.text.primary,
            marginTop: 16,
          }}>
            No Payments Found
          </ThemeText>
          <ThemeText style={{
            fontSize: 14,
            color: theme.colors.text.secondary,
            marginTop: 8,
            textAlign: 'center',
          }}>
            Record your first payment to get started
          </ThemeText>
        </View>
      }
    />
  );

  const renderDueTab = () => (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {/* Overdue Section */}
      {overduePayments.length > 0 && (
        <View style={{ marginBottom: 24 }}>
          <ThemeText style={{
            fontSize: 20,
            fontWeight: '600',
            color: theme.colors.warning,
            marginBottom: 16,
          }}>
            Overdue Payments ({overduePayments.length})
          </ThemeText>
          <FlatList
            data={overduePayments}
            renderItem={renderPaymentItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      )}

      {/* Due Soon Section */}
      {dueSoonPayments.length > 0 && (
        <View style={{ marginBottom: 24 }}>
          <ThemeText style={{
            fontSize: 20,
            fontWeight: '600',
            color: theme.colors.accent,
            marginBottom: 16,
          }}>
            Due in 3 Days ({dueSoonPayments.length})
          </ThemeText>
          <FlatList
            data={dueSoonPayments}
            renderItem={renderPaymentItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      )}

      {overduePayments.length === 0 && dueSoonPayments.length === 0 && (
        <View style={{ alignItems: 'center', padding: 60 }}>
          <Ionicons name="checkmark-circle" size={64} color={theme.colors.primary} />
          <ThemeText style={{
            fontSize: 18,
            fontWeight: '600',
            color: theme.colors.text.primary,
            marginTop: 16,
          }}>
            All payments are up to date!
          </ThemeText>
          <ThemeText style={{
            fontSize: 14,
            color: theme.colors.text.secondary,
            marginTop: 8,
            textAlign: 'center',
          }}>
            No payments are overdue or due soon
          </ThemeText>
        </View>
      )}
    </ScrollView>
  );

  const renderAnalyticsTab = () => (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <ThemeText style={{
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.text.primary,
        marginBottom: 20,
      }}>
        Coming Soon
      </ThemeText>
      
      <View style={{
        backgroundColor: theme.colors.card,
        borderRadius: 12,
        padding: 24,
        alignItems: 'center',
      }}>
        <Ionicons name="stats-chart" size={64} color={theme.colors.text.secondary} />
        <ThemeText style={{
          fontSize: 16,
          fontWeight: '600',
          color: theme.colors.text.primary,
          marginTop: 16,
          marginBottom: 8,
        }}>
          Revenue Analytics
        </ThemeText>
        <ThemeText style={{
          fontSize: 14,
          color: theme.colors.text.secondary,
          textAlign: 'center',
          lineHeight: 20,
        }}>
          Detailed revenue analytics, payment method breakdowns, 
          and financial reports will be available in the next update.
        </ThemeText>
      </View>
    </ScrollView>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'all':
        return renderAllPaymentsTab();
      case 'due':
        return renderDueTab();
      case 'analytics':
        return renderAnalyticsTab();
      default:
        return renderOverviewTab();
    }
  };

  // Check permissions
  if (!canManagePayments) {
    return (
      <ThemeView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <StatusBar 
          barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background}
        />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 }}>
            <Ionicons 
              name="lock-closed-outline" 
              size={64} 
              color={theme.colors.text.secondary} 
              style={{ marginBottom: 24 }}
            />
            <ThemeText style={{
              fontSize: 20,
              fontWeight: '600',
              color: theme.colors.text.primary,
              marginBottom: 12,
            }}>
              Access Restricted
            </ThemeText>
            <ThemeText style={{
              fontSize: 14,
              color: theme.colors.text.secondary,
              textAlign: 'center',
              lineHeight: 20,
            }}>
              You need to be an owner or staff member to view and manage payments.
            </ThemeText>
          </View>
        </SafeAreaView>
      </ThemeView>
    );
  }

  return (
    <ThemeView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar 
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          height: 56,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        }}>
          <View style={{ flex: 1 }}>
            <ThemeText style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: theme.colors.text.primary,
            }}>
              Payments
            </ThemeText>
            <ThemeText style={{
              fontSize: 12,
              color: theme.colors.text.secondary,
              marginTop: 2,
            }}>
              {currentGym?.name || 'Gym'}
            </ThemeText>
          </View>
          
          <TouchableOpacity
            style={{
              backgroundColor: theme.colors.primary,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 8,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={handleRecordPayment}
          >
            <Ionicons name="add" size={18} color="#FFFFFF" style={{ marginRight: 4 }} />
            <ThemeText style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#FFFFFF',
            }}>
              Record
            </ThemeText>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
          backgroundColor: theme.colors.background,
        }}>
          {([
            { key: 'overview', label: 'Overview', icon: 'grid' },
            { key: 'all', label: 'All', icon: 'list' },
            { key: 'due', label: 'Due', icon: 'time' },
            { key: 'analytics', label: 'Analytics', icon: 'stats-chart' },
          ] as const).map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={{
                flex: 1,
                alignItems: 'center',
                paddingVertical: 12,
                borderBottomWidth: 2,
                borderBottomColor: activeTab === tab.key ? theme.colors.primary : 'transparent',
              }}
              onPress={() => setActiveTab(tab.key)}
            >
              <Ionicons 
                name={tab.icon as any}
                size={20}
                color={activeTab === tab.key ? theme.colors.primary : theme.colors.text.secondary}
                style={{ marginBottom: 4 }}
              />
              <ThemeText style={{
                fontSize: 12,
                fontWeight: activeTab === tab.key ? '600' : '400',
                color: activeTab === tab.key ? theme.colors.primary : theme.colors.text.secondary,
              }}>
                {tab.label}
              </ThemeText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content */}
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <ThemeText style={{
              marginTop: 16,
              color: theme.colors.text.secondary,
            }}>
              Loading payment data...
            </ThemeText>
          </View>
        ) : (
          <ScrollView 
            style={{ flex: 1 }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[theme.colors.primary]}
                tintColor={theme.colors.primary}
              />
            }
          >
            {renderTabContent()}
          </ScrollView>
        )}
      </SafeAreaView>

      {/* Payment Modal */}
      <PaymentRecordModal
        visible={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        payment={selectedPayment}
        onSuccess={handlePaymentSuccess}
      />
    </ThemeView>
  );
};

export default PaymentsDashboardScreen;