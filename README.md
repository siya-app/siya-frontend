# Siya App front end Reference Guide.

Figma wireframe: [https://www.figma.com/design/G304yiAIEXMgrx4mtccl7c/SiyaAppWireframe?node-id=0-1&amp;p=f&amp;t=HWQxk9M4dLf9xMRc-0](https://www.figma.com/design/G304yiAIEXMgrx4mtccl7c/SiyaAppWireframe?node-id=0-1&p=f&t=HWQxk9M4dLf9xMRc-0)

I’ve created a simple folder structure, feel free to change it and reorganize.

I have copied some code snippets from other projects, and didn’t style anything yet. So go ahead. Everyone alright with inline styling with tailwind, or your prefer separate css files?

We can use this names as css classes now (siya colors) 

@theme {

  --siya-red:#FF1818;

  --siya-baby-blue:#DDFCFF;

  --siya-green-green:#79918E;

  --siya-light-grey:#E1E1E1;

  --siya-lemon-cream:#FFFFF1;

  --siya-dark-green:#385852;

}

He instalado lucide-react para los iconos del weather

**

## pendiente: Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
