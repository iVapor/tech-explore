module.exports = {
  meta: {
    docs: {
      description: 'class 用法错误',
    },
    fixable: null,
  },
  create: (context) => {
    return {
      'ClassDeclaration': (node) => { // class A {}
        context.report({
          node,
          message: 'class 用法错误, 请参考 js 规范',
        });
      },
    };
  },
};