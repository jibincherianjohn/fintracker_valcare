import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const Charts = ({ transactions = [] }) => {
  const incomeExpenseChartRef = useRef(null);
  const categoryChartRef = useRef(null);
  const incomeExpenseChart = useRef(null);
  const categoryChart = useRef(null);

  // Calculate category breakdown for expenses
  const getCategoryBreakdown = () => {
    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    const breakdown = {};
    
    expenseTransactions.forEach(transaction => {
      if (breakdown[transaction.category]) {
        breakdown[transaction.category] += parseFloat(transaction.amount);
      } else {
        breakdown[transaction.category] = parseFloat(transaction.amount);
      }
    });
    
    return breakdown;
  };

  const categoryData = getCategoryBreakdown();

  // Calculate totals for income vs expense
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  useEffect(() => {
    // Destroy existing charts
    if (incomeExpenseChart.current) {
      incomeExpenseChart.current.destroy();
    }
    if (categoryChart.current) {
      categoryChart.current.destroy();
    }

    // Income vs Expenses Bar Chart
    if (incomeExpenseChartRef.current) {
      const incomeExpenseOptions = {
        series: [{
          name: 'Amount',
          data: [totalIncome, totalExpenses]
        }],
        chart: {
          type: 'bar',
          height: 300,
          toolbar: {
            show: false
          },
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800
          }
        },
        plotOptions: {
          bar: {
            borderRadius: 8,
            columnWidth: '50%',
            colors: {
              ranges: [{
                from: 0,
                to: totalIncome,
                color: '#22C55E'
              }, {
                from: totalIncome,
                to: totalExpenses,
                color: '#EF4444'
              }]
            }
          }
        },
        colors: ['#22C55E', '#EF4444'],
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['Income', 'Expenses'],
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return '$' + val.toFixed(0);
            }
          }
        },
        grid: {
          borderColor: '#f1f5f9',
          strokeDashArray: 5
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return '$' + val.toFixed(2);
            }
          }
        },
        fill: {
          opacity: 0.8
        }
      };

      incomeExpenseChart.current = new ApexCharts(incomeExpenseChartRef.current, incomeExpenseOptions);
      incomeExpenseChart.current.render();
    }

    // Category Breakdown Donut Chart
    if (categoryChartRef.current && Object.keys(categoryData).length > 0) {
      const categoryOptions = {
        series: Object.values(categoryData),
        chart: {
          type: 'donut',
          height: 350,
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800
          }
        },
        colors: [
          '#EF4444', '#3B82F6', '#22C55E', '#F59E0B',
          '#8B5CF6', '#EC4899', '#6366F1', '#6B7280'
        ],
        labels: Object.keys(categoryData),
        dataLabels: {
          enabled: true,
          formatter: function (val, opts) {
            const value = opts.w.config.series[opts.seriesIndex];
            return '$' + value.toFixed(0);
          },
          style: {
            fontSize: '12px',
            fontWeight: 'bold'
          },
          dropShadow: {
            enabled: false
          }
        },
        plotOptions: {
          pie: {
            donut: {
              size: '70%',
              labels: {
                show: true,
                total: {
                  show: true,
                  label: 'Total Expenses',
                  fontSize: '14px',
                  fontWeight: 600,
                  formatter: function (w) {
                    const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                    return '$' + total.toFixed(2);
                  }
                }
              }
            }
          }
        },
        legend: {
          position: 'right',
          offsetY: 0,
          height: 300,
          fontSize: '12px',
          formatter: function(seriesName, opts) {
            const value = opts.w.config.series[opts.seriesIndex];
            const total = opts.w.config.series.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return seriesName + ': $' + value.toFixed(0) + ' (' + percentage + '%)';
          }
        },
        tooltip: {
          y: {
            formatter: function (val) {
              const total = categoryChart.current.w.config.series.reduce((a, b) => a + b, 0);
              const percentage = ((val / total) * 100).toFixed(1);
              return '$' + val.toFixed(2) + ' (' + percentage + '%)';
            }
          }
        },
        responsive: [{
          breakpoint: 768,
          options: {
            legend: {
              position: 'bottom'
            }
          }
        }]
      };

      categoryChart.current = new ApexCharts(categoryChartRef.current, categoryOptions);
      categoryChart.current.render();
    }

    return () => {
      if (incomeExpenseChart.current) {
        incomeExpenseChart.current.destroy();
      }
      if (categoryChart.current) {
        categoryChart.current.destroy();
      }
    };
  }, [transactions, totalIncome, totalExpenses, categoryData]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-purple-100 rounded-lg mr-3">
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Financial Overview</h3>
      </div>
      
      <div className="space-y-8">
        {/* Income vs Expenses Chart */}
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-4">Income vs Expenses</h4>
          <div ref={incomeExpenseChartRef}></div>
        </div>

        {/* Category Breakdown Chart */}
        {Object.keys(categoryData).length > 0 ? (
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-4">Expenses by Category</h4>
            <div ref={categoryChartRef}></div>
          </div>
        ) : (
          <div className="text-center py-8">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
            <p className="text-gray-500">No expense data to display</p>
            <p className="text-sm text-gray-400">Add some transactions to see charts</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Charts;