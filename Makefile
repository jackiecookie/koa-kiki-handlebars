
include node_modules/make-lint/index.mk

REQUIRED = --require should

TESTS=test/*


test:
	@NODE_ENV=test $(BIN) \
		./node_modules/.bin/_mocha \
		$(REQUIRED) \
		$(TESTS) \
		--bail


.PHONY: test