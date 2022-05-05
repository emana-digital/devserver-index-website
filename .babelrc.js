module.exports = {
	presets: ['@babel/env', '@babel/typescript', '@babel/react'],
	plugins: [
		[
			'babel-plugin-styled-components',
			{
				displayName: true,
				pure: true,
				transpileTemplateLiterals: true,
				fileName: false
			}
		],
		process.env.NODE_ENV !== 'production' && ['react-refresh/babel']
	].filter(Boolean)
};
