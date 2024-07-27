arbitrum
RPC_URL = https://arb-sepolia.g.alchemy.com/v2/0hnyAnUKEEZR33s1EVRNly0BXZThh_XS
VERIFIER_URL = https://api.tenderly.co/api/v1/account/sam0264/project/project/etherscan/verify/network/421614
ETHERSCAN_API_KEY = XzhQCwG-0A1D0QQsizdk3DQ4OlSL7R-V
PRIVATE_KEY = b0104cc3ae940f18c66addbb6076c5f98d1c0f350cc2fe0c1b585e66b7ec498b
CONTRACT_PATH = src/MultichainReceiver.sol:MultichainReceiver


# btcfi

# RPC_URL = https://arb-sepolia.g.alchemy.com/v2/0hnyAnUKEEZR33s1EVRNly0BXZThh_XS
# VERIFIER_URL = https://api.tenderly.co/api/v1/account/sam0264/project/project/etherscan/verify/network/421614
# ETHERSCAN_API_KEY = XzhQCwG-0A1D0QQsizdk3DQ4OlSL7R-V
# PRIVATE_KEY = b0104cc3ae940f18c66addbb6076c5f98d1c0f350cc2fe0c1b585e66b7ec498b
# CONTRACT_PATH = src/MultichainReceiver.sol:MultichainReceiver


# Default target
all: deploy

# Target to deploy the contract
deploy:
	forge create $(CONTRACT_PATH) \
	    --rpc-url $(RPC_URL) \
	    --verify \
	    --verifier-url $(VERIFIER_URL) \
	    --etherscan-api-key $(ETHERSCAN_API_KEY) \
	    --private-key $(PRIVATE_KEY) \

# Phony target to prevent conflicts with files named 'deploy'
.PHONY: deploy