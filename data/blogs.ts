/* ─────────────────────────────────────────────────────────────────────────
   blogs.ts
   Hardcoded blog data — add new posts here, they appear automatically
   on /blog and in the Updates section on the homepage.
───────────────────────────────────────────────────────────────────────── */

export interface StatBlock {
  value: string;
  label: string;
}

export type ContentBlock =
  | { type: "p";     text: string }
  | { type: "h2";    text: string }
  | { type: "h3";    text: string }
  | { type: "list";  items: string[] }
  | { type: "code";  text: string }
  | { type: "stats"; stats: StatBlock[] };

export interface BlogPost {
  slug:     string;
  title:    string;
  date:     string;
  tag:      string;
  excerpt:  string;
  readTime: string;
  content:  ContentBlock[];
}

/* ─────────────────────────────────────────────────────────────────────────
   Posts — newest first
───────────────────────────────────────────────────────────────────────── */
export const blogs: BlogPost[] = [
  {
    slug:     "encryptedfi-evm",
    title:    "EncryptedFi EVM - Confidential Transfers for Every ERC-20",
    date:     "March 2026",
    tag:      "PROTOCOL",
    excerpt:
      "On Ethereum, every wallet balance and transfer is public by default. EncryptedFi changes that - bringing zero-knowledge confidential transfers to every ERC-20 token on every supported chain, with no admin keys and no permission required.",
    readTime: "8 min read",
    content: [

      { type: "p", text:
        "The data is public. On Ethereum, every wallet balance, every swap, every transfer has been visible to anyone since block zero. This was a deliberate design choice - transparency as the price of trustlessness. For most use cases this is acceptable. For financial activity involving real people and real stakes, it is a significant problem. EncryptedFi changes the equation."
      },

      { type: "h2", text: "The Privacy Gap in Numbers" },

      { type: "p", text:
        "The scale of the problem is concrete. Every transaction is indexed by analytics firms, every balance is queryable in real time, every pattern is traceable across wallets. Blockchain data companies process billions of transaction records every year, mapping on-chain activity to real-world identities."
      },

      { type: "p", text:
        "The market has been trying to solve this for years. Railgun, the leading EVM privacy protocol, has facilitated over $4 billion in private transfer volume since its launch. Houdini, a cross-chain private swap protocol, has processed over $1.5 billion in private volume. Before regulatory action in 2022, Tornado Cash processed over $7.6 billion across its lifetime. The demand is not speculative - it is measured in billions of dollars of user activity."
      },

      { type: "stats", stats: [
        { value: "$4B+",   label: "Railgun private volume since launch" },
        { value: "$1.5B+", label: "Houdini private swap volume" },
        { value: "$7.6B",  label: "Tornado Cash lifetime volume" },
      ]},

      { type: "p", text:
        "The signal has reached the top of the industry. In February 2026, Binance founder Changpeng Zhao called privacy the missing link for crypto payments adoption, stating that most cryptocurrencies do not have enough privacy features to function as everyday payment tools. When the founder of the world's largest crypto exchange frames privacy as a prerequisite for mainstream adoption, the scale of the unsolved problem becomes clear."
      },

      { type: "p", text:
        "Yet for most users, accessing private transfers remains difficult. Existing tools require technical knowledge, support limited token lists, or demand trust in centralized components. The result is a privacy gap that grows wider as on-chain activity scales. EncryptedFi is built to close it."
      },

      { type: "h2", text: "What EncryptedFi Does" },

      { type: "p", text:
        "EncryptedFi is a zero-knowledge confidential transfer layer for EVM chains. It wraps any standard ERC-20 token into a confidential equivalent using ZK-SNARK proofs - hiding receiver addresses, token balances, and transfer amounts from on-chain observers."
      },

      { type: "p", text:
        "The core design difference from existing protocols is scope. Where existing tools require token-specific deployments or centralized whitelists, EncryptedFi is a permissionless factory. Any ERC-20, on any supported chain, can be made confidential in a single factory call by anyone with no permission required."
      },

      { type: "p", text: "The protocol hides three things that existing systems expose:" },

      { type: "list", items: [
        "Receiver address - never appears on-chain for transfers or mints",
        "Token balances - stored as opaque Poseidon commitment hashes, not address-keyed mappings",
        "Transfer amounts - embedded inside the ZK proof, never a public input on-chain",
      ]},

      { type: "h2", text: "The UTXO Model" },

      { type: "p", text:
        "Instead of the standard EVM pattern of mapping(address => uint256) for balances, EncryptedFi maintains a global set of commitment hashes. No address appears in storage. No address is emitted in events. A confidential note is a Poseidon hash commitment of the form:"
      },

      { type: "code", text:
        "commitment      = Poseidon(amount, blinding_factor, receiver_zk_key)\nreceiver_zk_key = Poseidon(eth_public_key.x, eth_public_key.y)"
      },

      { type: "p", text:
        "The receiver scans NoteCreated events, attempts ECIES decryption with their ETH private key, and on success learns they received a note containing a specific amount. To every external observer - including on-chain validators - the transaction creates two random-looking 32-byte values and consumes one nullifier. No amount, no identity, no relationship between sender and receiver."
      },

      { type: "h2", text: "Three ZK Circuits" },

      { type: "p", text:
        "Three Groth16 circuits compiled with Circom 2.2.3 and verified on-chain via BN254 pairing checks power the protocol:"
      },

      { type: "h3", text: "Transfer Circuit - 2,499 Constraints" },

      { type: "p", text:
        "Proves a sender consumes one note via nullifier and creates two output notes - one for the receiver, one as change. No receiver address appears as a public input. The fee commitment is an additional output note credited directly to the protocol fee recipient as an encrypted note."
      },

      { type: "h3", text: "Mint Circuit - 517 Constraints" },

      { type: "p", text:
        "Proves a deposit of X tokens produces a valid commitment for exactly X tokens minus the wrap fee. Called exclusively by the Vault contract after locking the underlying ERC-20. 517 constraints is deliberately lean - mint is called on every wrap operation and must remain gas-efficient at scale."
      },

      { type: "h3", text: "Burn Circuit - 1,760 Constraints" },

      { type: "p", text:
        "Proves a note owner can consume their note and release underlying ERC-20 tokens. The withdrawal recipient address is visible on-chain - this is unavoidable for a plain ERC-20 transfer and is acceptable because unwrap is the explicit exit from the private system. Once you are inside, all transfers stay private."
      },

      { type: "h2", text: "Trustless by Design" },

      { type: "p", text:
        "The protocol has no admin keys. This is not a goal statement - it is an on-chain property enforced by the contracts themselves."
      },

      { type: "list", items: [
        "The ConfidentialVerifier locks verification keys forever after setup. A single call sets a circuit key and marks it as finalised. No subsequent call can change it - not even from the deployer address.",
        "ConfidentialToken and Vault contracts have no owner after deployment. No pause function. No guardian. No multisig. No timelock.",
      ]},

      { type: "p", text:
        "Once deployed, the only way to change protocol behavior is to deploy a new set of contracts from scratch. The existing deployment is immutable and fully autonomous."
      },

      { type: "h2", text: "First Wave - Every ERC-20" },

      { type: "p", text:
        "The first deployment wave targets multiple EVM networks simultaneously with a single canonical contract deployment per chain and support for every ERC-20 token with no listing process."
      },

      { type: "p", text:
        "The relay infrastructure runs across all supported chains from a single server, routing by chainId on each request. Relayed transactions allow users to submit confidential transfers without holding native gas tokens - lowering the entry barrier from having ETH first to simply having any ERC-20."
      },

      { type: "h2", text: "What Comes Next" },

      { type: "p", text: "This is the first post in the EncryptedFi build log. Future posts will cover:" },

      { type: "list", items: [
        "The relay architecture - how gasless confidential transfers work without any ETH",
        "The bootstrapper contract - how new users enter the private system for the first time",
        "Batch proof operations for high-frequency applications",
        "Integration guides for DEX and lending protocol teams",
      ]},

      { type: "p", text:
        "Testnet deployment is the next milestone. Every figure cited here - circuit constraints, fee rates, contract architecture - is live code verifiable on-chain by anyone. The protocol is open."
      },

    ],
  },

  /* ── Add new posts above this line ─────────────────────────────────────
     Copy the object above, change the slug/title/date/content, save.
     The new post appears on /blog and in the Updates section automatically.
  ────────────────────────────────────────────────────────────────────── */
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogs.find((b) => b.slug === slug);
}
