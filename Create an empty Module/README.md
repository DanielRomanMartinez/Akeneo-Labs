# Intro

Let's create our first module. After this module you will know how:

* Create a new route
* Create a new view
* Create register the new view and js

## Creating the structure

First of all you need to create the next folder inside **SRC**

**src/<company>/Bundle/<nameOfModule>Bundle/**

For example:

**src/MyCompany/Bundle/MyCustomBundle/**

After that you need to create an empty class, this class will be used after.

**src/MyCompany/Bundle/MyCustomBundle/MyCompanyMyCustomBundle.php**

The content of the class is the next:


```
#!php

<?php

namespace MyCompany\Bundle\MyCustomBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class MyCompanyMyCustomBundle extends Bundle
{
}
```

## Register the bundle in Akeneo

After that, we need to register this new bundle that we created in to Akeneo, to do that we need to edit the next file:

**app/AppKernel.php**

And edit the **registerProjectBundles** function to add our bundle.


```
#!php

protected function registerProjectBundles()
{
  return [
       // your app bundles should be registered here
       new MyCompany\Bundle\MyCustomBundle\MyCompanyMyCustomBundle(),
  ];
}
```

## Create our first route

To create our first route we need to create the **routing.yml** file

Must be located here:

**src/MyCompany/Bundle/MyCustomBundle/Resources/config**

We need to create Resources and config folder

After that, we write the route the we want


```
#!yaml

my_company_my_custom_bundle_index:
  path: /my-custom-route
  methods: [GET]
```

Then we need to import all our routed in Akeneo.

Edit the next file and add: **app/config/routing.yml**


```
#!yaml

mycompany_mycustom:
    resource: "@MyCompanyMyCustomBundle/Resources/config/routing.yml"
```


## Create our view

Without a view. We can't do anything, we won't see anything. So, lets create our first view

First of all, we need to create **requirejs.yml**. Located in: **src/MyCompany/Bundle/MyCustomBundle/Resources/config/requirejs.yml**

With this file we can set JS and HTML.


```
#!yaml

config:
  paths:
    # JS
    mycompany/mybundle: mycompanymycustom/js/my-first-js

    # HTML
    mycompany/mybundle/template/index: mycompanymycustom/templates/index.html

  config:
    pim/controller-registry:
      controllers: # Registering a new controller for this view
        my_company_my_custom_bundle_index: # Must be the same name that routing
          module: mycompany/mybundle
```

Then lets create the JS and the view. We need to create the **public** folder. This folder will contain our all JS and HTML files.

After this, we will create the file inside of the folder we wrote in routing.yml.

For example **my-first-js** inside of **JS folder** and **index.html** inside of *templates*

### my-first-js.js 

**src/MyCompany/Bundle/MyCustomBundle/Resources/public/js/my-first-js.js**


```
#!javascript

'use strict';

define(['underscore', 'pim/controller/front', 'pim/form-builder'],
    function (_, BaseController, FormBuilder) {
        return BaseController.extend({
            initialize: function (options) {
                this.options = options;
            },

            renderForm: function (route) {
                return FormBuilder.build('my-company-my-bundle-index').then((form) => {
                    form.setElement(this.$el).render();
                    return form;
                });
            }
        });
    }
);
```

### index.html

**src/MyCompany/Bundle/MyCustomBundle/Resources/public/templates/index.html**

```
#!html

<h1>My Custom Bundle</h1>

<p>This is My Custom Bundle!</p>
```

## Create the page Content

The JS that we made, is a controller that is pointing to **my-company-my-bundle-index**

as we can check here:


```
#!javascript

return FormBuilder.build('my-company-my-bundle-index').then((form) => {
```

Then we need to create the Page Content.

Create **index.yml** inside of **form_extension**, that is inside of **config**

And then we will have the next content


```
#!yaml

# src/Acme/Bundle/AppBundle/Resources/config/form_extensions/custom-index.yml
extensions:
  my-company-my-bundle-index:
    module: pim/common/simple-view
    config:
      template: mycompany/mybundle/template/index
```

## Execute commands

Finally exeute the next commands to let Akeneo copy all the files inside of **web** folder

Inside of webfolder you will see all the bundles, also the bundle that you made:



```
#!shell

bin/console pim:installer:dump-require-paths
bin/console pim:install:assets
bin/console assets:install --symlink
yarn run less
yarn run webpack
```

Finally you can access in the with next url: http://akeneo.test:8080/#/my-custom-route

![first-module.png](https://i.imgur.com/xK6vVsj.png)

## Lasts comments

Notice that after running all those commants, you will see that the public folder have been coppied in **/web/bundles/mycompanymycustom**

This folder is made automatically by akeneo, thanks to the previous commands. Also, you will notice that in **requirejs.yml** file, is using this folder to point our files. 

So, be sure that you have this same name in requirejs

## Install the module

To install, put it inside of src folder and then edit the next file and add: **app/config/routing.yml**

```
#!yaml

mycompany_mycustom:
    resource: "@MyCompanyMyCustomBundle/Resources/config/routing.yml"
```

And edit the **registerProjectBundles** function to add our bundle.

```
#!php

protected function registerProjectBundles()
{
  return [
       // your app bundles should be registered here
       new MyCompany\Bundle\MyCustomBundle\MyCompanyMyCustomBundle(),
  ];
}
```