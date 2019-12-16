// /src/Acme/Bundle/AppBundle/Resources/public/js/controller/custom.js
'use strict';
define(['pim/controller/front', 'pim/form-builder'],
    function (BaseController, FormBuilder) {
        return BaseController.extend({
            renderForm: function (route) {
                return FormBuilder.build('my-company-my-bundle-index').then((form) => {
                    form.setElement(this.$el).render();
                });
            }
        });
    }
);