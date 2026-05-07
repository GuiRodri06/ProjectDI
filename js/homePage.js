document.addEventListener('DOMContentLoaded', () => {
    // IMPORTANTE: Verifique se o seu botão de abrir depósito tem este ID no HTML
    const depositBtn = document.getElementById('deposit-funds-btn'); 
    const depositModal = document.getElementById('deposit-modal');
    const cancelBtn = document.getElementById('cancel-deposit');
    const confirmBtn = document.getElementById('confirm-deposit');
    const depositAmountInput = document.getElementById('deposit-amount');
    const accountValueDisplay = document.getElementById('account-value');
    const uninvestedFundsAmount = document.getElementById('uninvested-funds-amount');

    // Inicializa os valores (com proteção caso o elemento não tenha texto ainda)
    let currentTotal = parseFloat(accountValueDisplay.innerText.replace('€', '').trim()) || 0;
    let currentUninvested = parseFloat(uninvestedFundsAmount.innerText.replace('€', '').trim()) || 0;

    const openModal = () => {
        if(depositModal) {
            depositModal.classList.remove('hidden');
            depositAmountInput.value = '';
        }
    };

    const closeModal = () => {
        if(depositModal) depositModal.classList.add('hidden');
    };

    const formatCurrency = (value) => {
        return `€${value.toFixed(2)}`;
    };

    // Listeners básicos
    if (depositBtn) depositBtn.addEventListener('click', openModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    confirmBtn.addEventListener('click', () => {
        const amount = parseFloat(depositAmountInput.value);
        
        if (isNaN(amount) || amount <= 0) {
            alert('Por favor, insira um valor válido.');
            return;
        }

        // Atualiza apenas o Total e o Uninvested Funds
        currentTotal += amount;
        currentUninvested += amount;

        // Atualiza a interface visual
        accountValueDisplay.innerText = formatCurrency(currentTotal);
        uninvestedFundsAmount.innerText = formatCurrency(currentUninvested);

        closeModal();
    });

    // Fechar ao clicar fora do modal
    depositModal.addEventListener('click', (e) => {
        if (e.target === depositModal) {
            closeModal();
        }
    });
});