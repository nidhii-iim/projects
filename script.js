// Page navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
  }
  showPage('dashboard'); // default
  
  // Theme toggle
  const toggleThemeBtn = document.getElementById('toggleTheme');
  toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
  
  // Local Storage setup
  let incomes = JSON.parse(localStorage.getItem('incomes')) || [];
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  let recurringExpenses = JSON.parse(localStorage.getItem('recurringExpenses')) || [];
  
  // Add Income
  document.getElementById('incomeForm').addEventListener('submit', e => {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('incomeAmount').value);
    const source = document.getElementById('incomeSource').value;
    const date = document.getElementById('incomeDate').value;
    incomes.push({ amount, source, date });
    localStorage.setItem('incomes', JSON.stringify(incomes));
    e.target.reset();
    updateDashboard();
    Swal.fire('Success!', 'Income Added!', 'success');
  });
  
  // Add Expense
  document.getElementById('expenseForm').addEventListener('submit', e => {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const category = document.getElementById('expenseCategory').value;
    const tag = document.getElementById('expenseTag').value;
    const date = document.getElementById('expenseDate').value;
    const recurring = document.getElementById('expenseRecurring').checked;
  
    expenses.push({ amount, category, tag, date });
    if (recurring) {
      recurringExpenses.push({ amount, category, tag, startDate: date });
      localStorage.setItem('recurringExpenses', JSON.stringify(recurringExpenses));
    }
    localStorage.setItem('expenses', JSON.stringify(expenses));
    e.target.reset();
    updateDashboard();
    renderChart();
    Swal.fire('Success!', 'Expense Added!', 'success');
  });
  
  // Recurring Expenses
  function applyRecurringExpenses() {
    const today = new Date().toISOString().split('T')[0];
    recurringExpenses.forEach(r => {
      const lastAdded = expenses.find(e => e.category === r.category && e.date === today);
      if (!lastAdded) expenses.push({ amount: r.amount, category: r.category, tag: r.tag, date: today });
    });
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }
  applyRecurringExpenses();
  
  // Dashboard
  function updateDashboard() {
    const totalIncome = incomes.reduce((a,b) => a + b.amount, 0);
    const totalExpenses = expenses.reduce((a,b) => a + b.amount, 0);
    const savings = totalIncome - totalExpenses;
    document.getElementById('totalIncome').textContent = totalIncome.toFixed(2);
    document.getElementById('totalExpenses').textContent = totalExpenses.toFixed(2);
    document.getElementById('savings').textContent = savings.toFixed(2);
  
    const recent = [...incomes.map(i => `Income: ₹${i.amount} (${i.source}) on ${i.date}`),
                    ...expenses.map(e => `Expense: ₹${e.amount} (${e.category}) on ${e.date}`)]
                    .sort((a,b) => new Date(b.date) - new Date(a.date))
                    .slice(0,5);
    document.getElementById('recentTransactions').innerHTML = recent.map(r => `<li>${r}</li>`).join('');
  
    // Fun badge
    if(savings >= 1000) Swal.fire('🎉 Great Job!', `You saved ₹${savings.toFixed(2)} this month!`, 'success');
  }
  
  // Chart
  function renderChart(filterMonth = null) {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    let filteredExpenses = expenses;
    if(filterMonth) filteredExpenses = expenses.filter(e => e.date.startsWith(filterMonth));
  
    const categories = [...new Set(filteredExpenses.map(e => e.category))];
    const amounts = categories.map(c => filteredExpenses.filter(e => e.category===c).reduce((a,b)=> a+b.amount,0));
  
    if(window.expenseChart) window.expenseChart.destroy();
    window.expenseChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: categories,
        datasets: [{
          data: amounts,
          backgroundColor: categories.map(()=>'#'+Math.floor(Math.random()*16777215).toString(16))
        }]
      },
      options: {
        onClick: (evt, item) => {
          if(item.length > 0){
            const idx = item[0].index;
            const cat = categories[idx];
            const trans = expenses.filter(e=>e.category===cat).map(e=>`₹${e.amount} on ${e.date} [${e.tag}]`).join('<br>');
            Swal.fire({title:`${cat} Transactions`, html: trans, icon:'info'});
          }
        }
      }
    });
  }
  
  // Month filter
  document.getElementById('monthFilter').addEventListener('change', e => renderChart(e.target.value));
  
  // Export CSV
  function exportCSV() {
    let csv = 'Type,Amount,Category/Source,Tag,Date\n';
    incomes.forEach(i=> csv += `Income,${i.amount},${i.source},,${i.date}\n`);
    expenses.forEach(e=> csv += `Expense,${e.amount},${e.category},${e.tag},${e.date}\n`);
    const blob = new Blob([csv], {type:'text/csv'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'expenses.csv';
    link.click();
  }
  
  // Initialize
  updateDashboard();
  renderChart();
  