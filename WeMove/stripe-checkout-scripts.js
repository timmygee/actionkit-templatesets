
// Insanely simple fake encapsulation. =) Meaningless change.



const WeMoveStripe = {

    enableCheckout: function (btnName) {

        if (btnName == undefined) btnName = 'button.stripe-checkout';

        $(function () {
            $('button.stripe-checkout').click(
                function (e) {
                    var button = e.target;
                    var method = $(button).data('paymentmethod');

                    var path = 'https://actionkit-stripe-api.not-a2.eu/checkout/payment';
                    if (actionkit.form.donation_type == 'recurring') {
                        path = 'https://actionkit-stripe-api.not-a2.eu/checkout/subscribe';
                    }
                    $.ajax({
                        url: path,
                        method: 'POST',
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        data: JSON.stringify({
                            "amount": actionkit.form.amount.value,
                            "email": actionkit.form.email.value,
                            "name": actionkit.form.name.value,
                            "line1": actionkit.form.address1.value,
                            "line2": actionkit.form.address2.value,
                            "postal": actionkit.form.postal.value,
                            "city": actionkit.form.city.value,
                            "region": actionkit.form.region.value,
                            "country": $('#id_country').val(),
                            "methods": [method]

                        })
                    }).then(function (resp) {
                        window.location = resp.url
                    })

                }
            );
        });
    },


    loadElements: function (element) {

    }
}

