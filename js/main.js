function xParseFloat(x) {
    var amount = x.replace(',', '.');
    amount = amount.replace(/[^0-9.]/, '');
    if (amount === '') {
        return false;
    } else {
        return parseFloat(amount);
    }
}

function getAmount() {
    var amount = document.getElementById('sum').value;
    return xParseFloat(amount);
}

function getVat() {
    var amount = document.getElementById('vat').value;
    return xParseFloat(amount);
}

function getOperation() {
    return document.getElementById('formactv').checked ? 'exclude' : 'add';
}

function calculatorSubmit() {
    var amount = getAmount();
    if (amount === false || isNaN(amount) || !isFinite(amount)) {
        return false;
    }
    var vat = getVat();
    if (vat === false || isNaN(vat) || !isFinite(vat)) {
        return false;
    }
    var operation = getOperation();
    var result;
    if (operation === 'exclude') {
        result = amount - amount / (1 + vat / 100);
    } else if (operation === 'add') {
        result = amount * (1 + vat / 100);
    }
    addResults(amount, vat, operation, result);
}

function toCurrencyString(x) {
    return (Math.round(x*100)/100).toFixed(2)
}

function resultBlock(caption, value) {
    return '<div class="result-block">' +
            caption + '<br/>' + value +
        '</div>'
}

function addResults(amount, vat, operation, result) {
    amount = toCurrencyString(amount);
    vat = toCurrencyString(vat);
    result = toCurrencyString(result);
    var html = '<div class="result clearfix">' +
        resultBlock('Amount:', amount) +
        resultBlock('VAT, %:', vat) +
        resultBlock('Operation:', operation) +
        ( operation === 'add' ?
            resultBlock('VAT added:', toCurrencyString(parseFloat(result) - parseFloat(amount))) + resultBlock('Gross amount:', result) :
            resultBlock('VAT excluded:', result) + resultBlock('Net amount:', toCurrencyString(parseFloat(amount) - parseFloat(result))) ) +
        '</div>';
    var innerHTML = document.getElementById('results').innerHTML;
    innerHTML = html + innerHTML;
    document.getElementById('results').innerHTML = innerHTML;
    return true;
}