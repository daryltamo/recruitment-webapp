# Code Linting Guide

This project uses **ESLint** for code linting and style enforcement. This guide explains how to use the linting tools effectively.

## 🔧 Setup

ESLint is already configured in this project. The configuration includes:

- **Base Configuration**: `eslint:recommended`
- **Node.js Rules**: `plugin:node/recommended`
- **Jest Testing Rules**: `plugin:jest/recommended`
- **Custom Rules**: Tailored for this Express.js recruitment webapp

## 📋 Available Commands

### Linting Commands

```bash
# Run linter on all files
npm run lint

# Run linter and auto-fix fixable issues
npm run lint:fix

# Run linter with helpful pre-commit messaging
npm run lint:check
```

### Integration with Other Scripts

```bash
# Run tests and linting together
npm test && npm run lint

# Full CI pipeline locally
npm run lint && npm test && npm run test:coverage
```

## 🎯 Linting Rules

### Error Prevention

- ❌ `no-console`: Warns about console statements (except in tests/scripts)
- ❌ `no-debugger`: Prevents debugger statements
- ❌ `no-unused-vars`: Catches unused variables
- ❌ `no-undef`: Prevents use of undefined variables

### Code Style

- 📏 `indent`: 4 spaces indentation
- 💬 `quotes`: Single quotes preferred
- 🔚 `semi`: Semicolons required
- 🚫 `no-trailing-spaces`: No trailing whitespace
- 📝 `eol-last`: Files must end with newline

### Best Practices

- ⚖️ `eqeqeq`: Strict equality required (`===` instead of `==`)
- 🔒 `curly`: Curly braces required for all control statements
- 🚨 `no-eval`: Prevents dangerous eval() usage

## 📁 File Organization

### Linted Files

- All `.js` files in `src/`
- All `.js` files in `test/`
- Route files, models, utilities
- Configuration files

### Ignored Files (see `.eslintignore`)

- `node_modules/`
- `coverage/`
- `public/fonts/` and `public/images/`
- Build outputs and logs
- Environment files

## 🔧 VS Code Integration

If using VS Code, the `.vscode/settings.json` file provides:

- Auto-fix on save
- ESLint integration
- Consistent formatting preferences

### Recommended VS Code Extensions

```
- ESLint (dbaeumer.vscode-eslint)
- Prettier (esbenp.prettier-vscode)
```

## 🚀 CI/CD Integration

ESLint runs automatically in the GitHub Actions pipeline:

1. **Install dependencies**
2. **Run unit tests**
3. **Generate test coverage**
4. **🔍 Run ESLint** ← New step!
5. Continue with build and deployment

## 🛠️ Common Issues & Solutions

### Issue: 'Parsing error' or 'Cannot resolve dependency'

**Solution**: Ensure all dependencies are installed:

```bash
npm install
```

### Issue: Too many linting errors

**Solution**: Auto-fix what can be fixed:

```bash
npm run lint:fix
```

### Issue: Want to ignore a specific rule for one line

**Solution**: Use ESLint disable comments:

```javascript
// eslint-disable-next-line no-console
console.log("This is okay");
```

### Issue: Want to ignore a rule for entire file

**Solution**: Add at top of file:

```javascript
/* eslint-disable no-console */
```

## 📊 Examples

### ✅ Good Code Style

```javascript
const express = require("express");
const router = express.Router();

router.get("/users", (req, res) => {
  const users = getUsersFromDatabase();
  res.json({ users });
});

module.exports = router;
```

### ❌ Bad Code Style (will be caught by linter)

```javascript
const express = require("express"); // Missing semicolon, double quotes
const router = express.Router();

router.get("/users", (req, res) => {
  const users = getUsersFromDatabase();
  console.log(users); // Console statement (warning)
  res.json({ users }); // Missing space after comma
});

module.exports = router;
```

## 🎯 Pre-commit Workflow

1. Make your code changes
2. Run `npm run lint:fix` to auto-fix issues
3. Run `npm run lint` to check for remaining issues
4. Fix any remaining issues manually
5. Commit your changes

## 📈 Benefits

- **Consistency**: All team members follow same code style
- **Error Prevention**: Catch common mistakes before runtime
- **Maintainability**: Easier to read and modify code
- **CI Integration**: Automatic checks prevent bad code from being merged

---

For more information about specific ESLint rules, visit: https://eslint.org/docs/rules/
