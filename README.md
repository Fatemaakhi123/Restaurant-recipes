Recipe App
1.Implemented an authentication flow using name, email, phone, and a password.
2.Created a page where users can view all recipes.
3.Added Recipe to Cart: Allow users to add recipes to a cart. The cart should store data locally if the user is not logged in, and save it to the user’s account if they are logged in.

Fixed bugs---

4.Parsing error: Cannot find module 'next/babel'
Require stack:
- E:\New folder\practical-assessment\node_modules\next\dist\compiled\babel\bundle.js
- E:\New folder\practical-assessment\node_modules\next\dist\compiled\babel\eslint-parser.js
- E:\New folder\practical-assessment\node_modules\eslint-config-next\parser.js
- E:\New folder\practical-assessment\node_modules\@eslint\eslintrc\dist\eslintrc.cjs

Make sure that all the Babel plugins and presets you are using
are defined as dependencies or devDependencies in your package.json
file. It's possible that the missing plugin is loaded by a preset
you are using that forgot to add the plugin to its dependencies: you
can workaround this problem by explicitly adding the missing package
to your top-level package.json.--

solved this bug using .eslintrc.json where {
  "extends": ["next","next/core-web-vitals"],
  "parser": "babel/eslint-parser"
}
5.the modal was not working,fixed it
6.the close button wass not working,fixed it
7.Signup and Login was not working ,also added my profile and logout option
8.fixed the search option
9.Added remove option in Cart page
8.Added this feature Cannot access to the Cart option until login or registered

It took 1 and half day to complete all this
