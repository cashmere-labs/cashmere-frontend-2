import { Row } from "../../components";
import { Network } from "../../types/network";
import { Token } from "../../types/token";
import { NetworkBadge } from "../../ui";

const TokenOrNetworkRenderer = ({
  tokenOrNetwork,
  imgSize = 24,
  type = "default",
}: {
  tokenOrNetwork: Token | Network;
  imgSize?: number;
  type?: "badge" | "default";
}) => {
  return (
    <Row style={{ width: "max-content" }} alignItems="center">
      {tokenOrNetwork instanceof Token || type === "default" ? (
        <>
          <img
            style={{ marginRight: "8px" }}
            width={imgSize}
            src={tokenOrNetwork.imageUrl}
          />
          <span style={{ color: "var(--text)" }}>{tokenOrNetwork.name}</span>
        </>
      ) : (
        <NetworkBadge
          size={24}
          fontSize="14px"
          label={tokenOrNetwork.type}
        />
      )}
    </Row>
  );
};

export { TokenOrNetworkRenderer };
