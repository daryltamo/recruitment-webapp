
/**
 * Pre-commit linting script
 * Runs ESLint on staged files and provides helpful output
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🔍 Running ESLint pre-commit checks...\n');

try {
    // Run ESLint on all JavaScript files
    execSync('npm run lint', {
        stdio: 'inherit',
        cwd: path.resolve(__dirname, '..')
    });

    console.log('\n✅ All lint checks passed!');

} catch (error) {
    console.log(
        '\n❌ Lint errors found. Run \'npm run lint:fix\' to auto-fix some issues.'
    );
    console.log(
        '💡 Tip: You can also run \'npx eslint --fix <file>\' to fix specific files.'
    );
    throw error;
}
