import { noise } from "@chainsafe/libp2p-noise";
import { yamux } from "@chainsafe/libp2p-yamux";
import { tcp } from "@libp2p/tcp";
import { createLibp2p } from "libp2p";
import { describe, it } from "vitest";

export const delay = (ms: number) => {
  return new Promise<void>((res, rej) => {
    setTimeout(() => {
      res();
    }, ms);
  });
};

async function createNode() {
  const node = await createLibp2p<any>({
    transports: [tcp()],
    connectionEncrypters: [noise()],
    streamMuxers: [yamux()],
    addresses: {
      listen: ["/ip4/127.0.0.1/tcp/0"],
    },
  });

  return node;
}

describe("delay5", () => {
  it("passes with 0 delay", async () => {
    console.info("start");
    const [node1, node2] = await Promise.all([createNode(), createNode()]);

    console.info("dial");
    node2.dial(node1.getMultiaddrs()).catch((e) => {}); // dont wait here

    await delay(0);

    console.info("stop");
    await node1.stop();
    console.log("start again");
    await node1.start();
    console.log("stop all");
    await Promise.all([node1, node2].map((x) => x.stop()));
    console.log("done");
  });

  it("passes with 5 delay", async () => {
    console.info("start");
    const [node1, node2] = await Promise.all([createNode(), createNode()]);

    console.info("dial");
    node2.dial(node1.getMultiaddrs()).catch((e) => {}); // dont wait here

    await delay(5); // but put a little bit of delay

    console.info("stop");
    await node1.stop();
    console.log("start again");
    await node1.start();
    console.log("stop all");
    await Promise.all([node1, node2].map((x) => x.stop()));
    console.log("done");
  });

  it("passes with 100 delay", async () => {
    console.info("start");
    const [node1, node2] = await Promise.all([createNode(), createNode()]);

    console.info("dial");
    node2.dial(node1.getMultiaddrs()).catch((e) => {}); // dont wait here

    await delay(100);

    console.info("stop");
    await node1.stop();
    console.log("start again");
    await node1.start();
    console.log("stop all");
    await Promise.all([node1, node2].map((x) => x.stop()));
    console.log("done");
  });
});
