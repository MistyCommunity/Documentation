module.exports = {
	"extends": "eslint:recommended",
	"rules": {
		"array-bracket-spacing": [2, "never"],
		"block-scoped-var": 2,
		"brace-style": [2, "1tbs"],
		"camelcase": [2, { "properties": "never" }],
		"constructor-super": 2,
		"curly": 2,
		"eol-last": 2,
		"eqeqeq": [2, "smart"],
		"func-names": 2,
		"func-style": [2, "declaration", { "allowArrowFunctions": true }],
		"handle-callback-err": 2,
		"indent": [2, "tab", {
			"SwitchCase": 1
		}],
		"keyword-spacing": [2, {
		  "before": true,
		  "after": true,
		}],
		"max-depth": [1, 3],
		"max-statements": [1, 30],
		"new-cap": 1,
		"no-class-assign": 2,
		"no-cond-assign": [2, "except-parens"],
		"no-const-assign": 2,
		"no-dupe-class-members": 2,
		"no-extend-native": 2,
		"no-extra-parens": [2, "functions"],
		"no-mixed-spaces-and-tabs": 2,
		"no-multi-spaces": [1, {
			"exceptions": {
				"VariableDeclarator": true
			}
		}],
		"no-nested-ternary": 2,
		"no-this-before-super": 2,
		"no-trailing-spaces": 2,
		"no-undef": 2,
		"no-underscore-dangle": 0,
		"no-unused-vars": [1, { "vars": "all", "args": "none"}],
		"no-use-before-define": [2, "nofunc"],
		"object-curly-spacing": [2, "always"],
		"quotes": [2, "single", "avoid-escape"],
		"semi": [2, "always"],
		"space-unary-ops": [2, {"words": true, "nonwords": false}],
		"strict": [2, "global"],
		"valid-jsdoc": [1, {
			"requireReturn": false,
			"requireParamDescription": false
		}]
	}
};
