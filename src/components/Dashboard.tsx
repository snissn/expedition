import { Grid, Typography, CircularProgress, Theme, Button } from "@material-ui/core";
import useCoreGethStore from "../stores/useCoreGethStore";
import * as React from "react";
import { weiToGwei } from "./formatters";
import HashRate from "./HashRate";

import getBlocks, { useBlockNumber } from "../helpers";
import useInterval from "use-interval";
import { useTheme } from "@material-ui/styles";
import getTheme from "../themes/victoryTheme";
import ChartCard from "./ChartCard";
import BlockListContainer from "../containers/BlockList";
import { hexToNumber } from "@etclabscore/eserialize";
import { useTranslation } from "react-i18next";
import { ArrowForwardIos } from "@material-ui/icons";
import StatCharts from "./StatCharts";
import EthereumJSONRPC, { Block as IBlock, IsSyncingResult as ISyncing} from "@etclabscore/ethereum-json-rpc";
import { useHistory } from 'react-router-dom';

const useState = React.useState;

const config = {
  blockTime: 15, // seconds
  blockHistoryLength: 100,
  chartHeight: 200,
  chartWidth: 400,
};

export default (props: any) => {
  const [erpc]: [EthereumJSONRPC, any] = useCoreGethStore();
  const theme = useTheme<Theme>();
  const victoryTheme = getTheme(theme);
  const [blockNumber] = useBlockNumber(erpc);
  const [chainId, setChainId] = useState<string>();
  const [block, setBlock] = useState<IBlock>();
  const [blocks, setBlocks] = useState<IBlock[]>();
  const [gasPrice, setGasPrice] = useState<string>();
  const [syncing, setSyncing] = useState<ISyncing>();
  const [peerCount, setPeerCount] = useState<string>();

  const { t } = useTranslation();

  const history = useHistory();

  React.useEffect(() => {
    if (!erpc) { return; }
    erpc.eth_chainId().then((cid) => {
      if (cid === null) { return; }
      setChainId(cid);
    });
  }, [erpc]);

  React.useEffect(() => {
    if (!erpc || blockNumber === undefined) { return; }
    erpc.eth_getBlockByNumber(`0x${blockNumber.toString(16)}`, true).then((b) => {
      if (b === null) { return; }
      setBlock(b);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber]);

  React.useEffect(() => {
    if (!erpc || blockNumber === null) { return; }
    getBlocks(
      Math.max(blockNumber - config.blockHistoryLength + 1, 0),
      blockNumber,
      erpc,
    ).then((bl) => {
      setBlocks(bl);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber]);

  useInterval(() => {
    if (!erpc) { return; }
    erpc.eth_syncing().then(setSyncing);
  }, 10000, true);

  React.useEffect(() => {
    if (!erpc) { return; }
    erpc.net_peerCount().then(setPeerCount);
  }, [erpc]);

  React.useEffect(() => {
    if (!erpc) { return; }
    erpc.eth_gasPrice().then(setGasPrice);
  }, [erpc]);

  if (!blocks || !chainId || !gasPrice || !peerCount) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Grid container spacing={3} direction="column">
        <Grid item container justify="space-between">
          <Grid item key="blockHeight">
            <ChartCard title={t("Block Height")}>
              <Typography variant="h4">{blockNumber}</Typography>
            </ChartCard>
          </Grid>
          <Grid key="chainId" item>
            <ChartCard title={t("Chain ID")}>
              <Typography variant="h4">{hexToNumber(chainId)}</Typography>
            </ChartCard>
          </Grid>
          {syncing &&
            <div key="syncing">
              <ChartCard title={t("Syncing")}>
                {typeof syncing === "object" && syncing.currentBlock &&
                  <Typography variant="h4">
                    {hexToNumber(syncing.currentBlock)} / {hexToNumber(syncing.highestBlock || "0x0")}
                  </Typography>
                }
              </ChartCard>
            </div>
          }
          <Grid key="gasPrice" item>
            <ChartCard title={t("Gas Price")}>
              <Typography variant="h4">{weiToGwei(hexToNumber(gasPrice))} Gwei</Typography>
            </ChartCard>
          </Grid>
          <Grid key="hRate" item>
          </Grid>
          <Grid key="peers" item>
          </Grid>
        </Grid>
      </Grid>
      <StatCharts victoryTheme={victoryTheme} blocks={blocks} />
      <Grid container justify="flex-end">
        <Button
          color="primary"
          variant="outlined"
          endIcon={<ArrowForwardIos />}
          onClick={() => history.push("explorer/stats/miners")}
        >More Stats</Button>
      </Grid>
      <br />

      <BlockListContainer
        from={Math.max(blockNumber - 14, 0)}
        to={blockNumber}
        disablePrev={true}
        disableNext={blockNumber < 14}
        onNext={() => {
          history.push(`/explorer/blocks/${blockNumber - 15}`);
        }}
        style={{ marginTop: "30px" }} />
    </div >
  );
};
