
include node_modules/make-lint/index.mk

REQUIRED = --require should

TESTS=test/babel.js


test:
	@NODE_ENV=test $(BIN) \
		./node_modules/.bin/_mocha \
		$(REQUIRED) \
		$(TESTS) \
		--bail


.PHONY: test