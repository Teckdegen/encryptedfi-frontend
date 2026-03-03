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

  /* ── NEWEST POST ──────────────────────────────────────────────────────── */
  {
    slug:     "flare-network-launch",
    title:    "EncryptedFi on Flare: Privacy Comes to F ASSETS",
    date:     "March 2026",
    tag:      "LAUNCH",
    excerpt:
      "EncryptedFi deploys on Flare Network first. USDT0, FXRP, and the full F ASSET family get zero-knowledge confidential transfers. No permission. No admin keys. Private by default.",
    readTime: "5 min read",
    content: [

      { type: "p", text:
        "Flare Network is live. EncryptedFi deploys here first. Every F ASSET on Flare gets a confidential wrapper. Zero-knowledge proofs verified on-chain. No addresses in storage. No amounts as public inputs. No sender-receiver link visible to anyone. EncryptedFi brings real privacy to Flare."
      },

      { type: "h2", text: "Why Flare First" },

      { type: "p", text:
        "Flare is built around real-world asset connectivity. F ASSETS bridge external chains to the EVM. USDT0 is already live, cross-chain and liquid. FXRP wraps XRP. But every transaction using these assets is fully public. Every balance exposed. Every flow visible to any analytics firm with a crawler. The assets that matter most on Flare have no privacy layer. Until now."
      },

      { type: "p", text:
        "We chose Flare for the first wave because the assets here are exactly what people move in volume. Stablecoins and cross-chain wrapped assets need privacy most. That is where we start."
      },

      { type: "h2", text: "What We Are Making Private" },

      { type: "p", text:
        "Starting with the assets that move the most on Flare:"
      },

      { type: "list", items: [
        "USDT0 - cross-chain stablecoin, fully private transfers on Flare",
        "FXRP - the XRP bridge asset, confidential wrap and transfer supported",
        "Other F ASSETS as they launch on the network",
      ]},

      { type: "p", text:
        "Once wrapped into a confidential equivalent, every transfer is zero-knowledge. Receiver address never touches the chain. Sender never appears in storage or events. Amount is inside the proof, not a public input on-chain."
      },

      { type: "h2", text: "How It Works" },

      { type: "p", text:
        "Three circuits. Three operations. Groth16 proofs verified on-chain with BN254 pairing checks. No centralized component in the transfer path."
      },

      { type: "list", items: [
        "Mint: deposit ERC-20 tokens, receive a Poseidon commitment note",
        "Transfer: consume a note via nullifier, produce two new notes for receiver and change",
        "Burn: prove note ownership, release underlying tokens to a visible withdrawal address",
      ]},

      { type: "p", text:
        "The full technical breakdown is in the EncryptedFi EVM post. The short version: no address-keyed balance mapping anywhere in the contract. Observers see two 32-byte hashes and a spent nullifier. Nothing else."
      },

      { type: "h2", text: "How We Ship Support" },

      { type: "p", text:
        "EncryptedFi deploys and maintains the official confidential token contracts on Flare. Every token goes through the same pipeline: circuit deployment, trusted setup with verifiable randomness, on-chain verification, SDK integration. We handle that for every asset we support."
      },

      { type: "p", text:
        "This matters because ZK circuits require a trusted setup. Randomness from multiple parties. The resulting zkey is embedded in the on-chain verifier. We run this process for every new token so teams building on EncryptedFi get one unified SDK, one API call for any confidential transfer on any supported asset, without auditing a new contract or running their own ceremony."
      },

      { type: "h2", text: "What Comes Next" },

      { type: "p", text:
        "Testnet first. Every figure in these posts is live code. Verifiable by anyone. Mainnet after audit and testnet stability."
      },

      { type: "p", text:
        "After Flare, the same protocol and the same SDK runs on every supported EVM chain. Privacy does not stop at one network."
      },

    ],
  },

  /* ── OLDER POSTS ──────────────────────────────────────────────────────── */
  {
    slug:     "encryptedfi-evm",
    title:    "EncryptedFi EVM: Confidential Transfers for Every ERC-20",
    date:     "March 2026",
    tag:      "PROTOCOL",
    excerpt:
      "Zero-knowledge confidential transfers for every ERC-20. No admin keys. No permission required. Sender, receiver, and amount all hidden from on-chain observers.",
    readTime: "8 min read",
    content: [

      { type: "p", text:
        "The data is public. Every wallet balance, every swap, every transfer. Visible to anyone since block zero. Transparency as the price of trustlessness. Fine for most use cases. But on any public EVM chain, not just Ethereum, on Flare, Polygon, and every chain built on the EVM stack, running real money in the open is unacceptable. EncryptedFi changes the equation."
      },

      { type: "h2", text: "The Privacy Gap in Numbers" },

      { type: "p", text:
        "Every transaction is indexed by analytics firms. Every balance is queryable in real time. Every pattern traceable across wallets. Blockchain data companies process billions of records a year, mapping on-chain activity to real identities."
      },

      { type: "p", text:
        "Let's be honest. Privacy on public EVM chains has been half-solved for years. Railgun has facilitated over $4 billion in private transfer volume. Houdini, $1.5 billion in private swaps. Tornado Cash did $7.6 billion before 2022. The demand is already in the billions. This isn't theoretical."
      },

      { type: "stats", stats: [
        { value: "$4B+",   label: "Railgun private volume since launch" },
        { value: "$1.5B+", label: "Houdini private swap volume" },
        { value: "$7.6B",  label: "Tornado Cash lifetime volume" },
      ]},

      { type: "p", text:
        "Binance founder Changpeng Zhao called privacy the missing link for crypto payments adoption. Most cryptocurrencies don't have enough privacy to function as everyday payment tools. When the head of the world's largest exchange frames it that way, the problem is obvious."
      },

      { type: "p", text:
        "Yet accessing private transfers still sucks. Existing tools need technical chops, support limited tokens, or ask you to trust centralized components. We built this after running into that wall ourselves."
      },

      { type: "h2", text: "What EncryptedFi Does" },

      { type: "p", text:
        "EncryptedFi is a zero-knowledge confidential transfer layer for EVM chains. It wraps any ERC-20 into a confidential equivalent using ZK-SNARK proofs. Receiver addresses, token balances, transfer amounts. All hidden from on-chain observers."
      },

      { type: "p", text:
        "The difference is scope. Other tools want token-specific deployments or centralized whitelists. EncryptedFi is a permissionless factory. Any ERC-20, any supported chain. One factory call. No permission."
      },

      { type: "p", text: "Four things existing systems expose that we hide:" },

      { type: "list", items: [
        "Sender address. Hidden on-chain. Never appears in storage or events.",
        "Receiver address. Never appears on-chain for transfers or mints.",
        "Token balances. Stored as opaque Poseidon commitment hashes, not address-keyed mappings.",
        "Transfer amounts. Embedded inside the ZK proof, never a public input.",
      ]},

      { type: "p", text:
        "We'll make USDT0 on Flare private alongside FXRP and other F ASSETS."
      },

      { type: "h2", text: "The UTXO Model" },

      { type: "p", text:
        "Instead of mapping(address => uint256), EncryptedFi maintains a global set of commitment hashes. No address in storage. None in events. A confidential note is a Poseidon hash:"
      },

      { type: "code", text:
        "commitment      = Poseidon(amount, blinding_factor, receiver_zk_key)\nreceiver_zk_key = Poseidon(eth_public_key.x, eth_public_key.y)"
      },

      { type: "p", text:
        "The receiver scans NoteCreated events, decrypts with their ETH key, and learns they got a note with a specific amount. To every external observer the tx creates two random 32-byte values and consumes one nullifier. No amount. No identity. No sender-receiver link."
      },

      { type: "h2", text: "Three ZK Circuits" },

      { type: "p", text:
        "Groth16, Circom 2.2.3, BN254 pairing checks on-chain."
      },

      { type: "h3", text: "Transfer Circuit (2,499 constraints)" },

      { type: "p", text:
        "Proves a sender consumes one note via nullifier and creates two outputs: one for the receiver, one as change. No receiver address as public input. Fee goes to the protocol fee recipient as an encrypted note."
      },

      { type: "h3", text: "Mint Circuit (517 constraints)" },

      { type: "p", text:
        "Proves a deposit of X tokens produces a valid commitment for X minus wrap fee. Called by the Vault after locking underlying ERC-20. 517 constraints because mint runs on every wrap. It has to stay lean."
      },

      { type: "h3", text: "Burn Circuit (1,760 constraints)" },

      { type: "p", text:
        "Proves a note owner can consume their note and release underlying tokens. The withdrawal address is visible. Unavoidable for plain ERC-20. Fine. Unwrap is the exit. Once you're in, everything stays private."
      },

      { type: "h2", text: "Trustless by Design" },

      { type: "p", text:
        "No admin keys. Not aspirational. Enforced by the contracts."
      },

      { type: "p", text:
        "No pause function. No upgrade path. It either works or it doesn't."
      },

      { type: "list", items: [
        "ConfidentialVerifier locks verification keys forever. One call sets a circuit key and marks it final. Nothing can change it. Not even the deployer.",
        "ConfidentialToken and Vault have no owner. No guardian. No multisig. No timelock.",
      ]},

      { type: "p", text:
        "After deployment, it's frozen. Want changes? Deploy a new system."
      },

      { type: "h2", text: "First Wave: Flare Network" },

      { type: "p", text:
        "We're deploying on Flare first, not all EVM. Bringing privacy to the Flare network. Every ERC-20. No listing process."
      },

      { type: "p", text:
        "Relay infrastructure runs across supported chains from a single server. Relayed txs let users submit confidential transfers without native gas. You don't need FLR first. Any ERC-20 works."
      },

      { type: "p", text:
        "EncryptedFi deploys and maintains the official confidential token contracts on each supported chain. Every supported asset goes through circuit deployment, trusted setup, and full SDK integration. Developers get one library, one API, one integration point regardless of which token or chain they are targeting."
      },

      { type: "h2", text: "What Comes Next" },

      { type: "p", text:
        "Flare Network is the first live deployment. USDT0, FXRP, and the full F ASSET family get confidential transfers. Read the Flare launch post for the full breakdown."
      },

      { type: "p", text:
        "Testnet is next. Every figure here, circuit constraints, fee rates, architecture, is live code. Verifiable by anyone. The protocol is open."
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
