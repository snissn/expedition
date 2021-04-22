import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  LinearProgress,
  Tooltip,
  makeStyles, withStyles, lighten
} from "@material-ui/core";
import * as React from "react";
import Link from "@material-ui/core/Link";
import { hexToDate, hexToNumber } from "@etclabscore/eserialize";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";


const rightPaddingFix = {
  paddingRight: "24px",
  fontWeight: 6000

};

const BorderLinearProgress = withStyles({
  root: {
    height: '1rem',
    width: '19rem',
    backgroundColor: 'white',
    border: '1px solid grey'
  },
  bar: {
    backgroundColor: '#0528F2',
  },
})(LinearProgress);

function BlockList({ blocks }: any) {
  const { t } = useTranslation();
  if (!blocks) {
    return null;
  }
  const sortedBlocks = blocks.sort(
    (a: { number: number }, b: { number: number }) => {
      return b.number - a.number;
    }
  );
  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography style = {{fontWeight: 600, fontSize: '1.5rem'}} >{t("Block Number")}</Typography>
            </TableCell>
            <TableCell>
              <Typography style = {{fontWeight: 600, fontSize: '1.5rem'}} >{t("Timestamp")}</Typography>
            </TableCell>
            <TableCell>
              <Typography style = {{fontWeight: 600, fontSize: '1.5rem'}} >{t("#Txs")}</Typography>
            </TableCell>
            <TableCell>
              <Typography style = {{fontWeight: 600, fontSize: '1.5rem'}} >{t("Gas Usage")}</Typography>
            </TableCell>
            <TableCell>
              <Typography style = {{fontWeight: 600, fontSize: '1.5rem'}} >{t("Gas Limit")}</Typography>
            </TableCell>
            <TableCell>
              <Typography style = {{fontWeight: 600, fontSize: '1.5rem'}} >{t("Hash")}</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedBlocks.map((b: any, index: number) => {
            const filledPercent =
              (hexToNumber(b.gasUsed) / hexToNumber(b.gasLimit)) * 100;

            // Shorten hash views by concatenating first and last 4 chars.
            const blockHashShort =
              b.hash.substring(2, 6) +
              "—" +
              b.hash.substring(b.hash.length - 5, b.hash.length - 1);

            // Colorize left border derived from author credit account.
            const authorHashStyle = {
              borderTop: `0.3em solid #${b.miner.substring(2, 8)}`,
              borderBottom: `0.3em solid #${b.miner.substring(2, 8)}`,
              borderLeft: `0.6em solid #${b.miner.substring(2, 8)}`,
              borderRight: `0.6em solid #${b.miner.substring(2, 8)}`,
              fontWeight: 6000
            };

            // Tally transactions which create contracts vs transactions with addresses.
            var txTypes = {
              create: 0,
              transact: 0
            };

            for (var i = 0; i < b.transactions.length; i++) {
              if (b.transactions[i].to !== null) {
                txTypes.transact++;
              } else {
                txTypes.create++;
              }
            }

            // Calculate difference of block timestamp from that of parent.
            const timeDifferenceFromParent =
              index === sortedBlocks.length - 1
                ? 0
                : hexToNumber(b.timestamp) -
                  hexToNumber(sortedBlocks[index + 1].timestamp);

            return (
              <>
              <TableRow key={b.number} style={authorHashStyle}>
                <TableCell component="th" scope="row" style = {{fontSize :'1.5rem'}}>
                  <Link
                    component={({
                      className,
                      children
                    }: {
                      children: any;
                      className: string;
                    }) => (
                      <RouterLink className={className} style = {{fontWeight: 600, fontSize: '1.5rem'}} to={`/block/${b.hash}`}>
                        {children}
                      </RouterLink>
                    )}
                  >
                    {parseInt(b.number, 16)}
                  </Link>
                </TableCell>
                <TableCell style={rightPaddingFix}>
                  <Typography  style = {{fontWeight: 600, fontSize: '1.5rem'}}>
                    {t("Timestamp Date", { date: hexToDate(b.timestamp) })}
                    &nbsp;
                    <sub>
                      (
                      {timeDifferenceFromParent > 0
                        ? `+${timeDifferenceFromParent}`
                        : `-${timeDifferenceFromParent}`}
                      s)
                    </sub>
                  </Typography>
                </TableCell>
                <TableCell style={rightPaddingFix} >
                  <Tooltip 
                    title={
                      t("Create Transactions", {
                        count: txTypes.create
                      }) as string
                    }
                    placement="top"
                  >
                    <Typography  style = {{fontWeight: 600, fontSize: '1.5rem'}} variant="caption" color="textSecondary">
                      {txTypes.create === 0 ? "" : txTypes.create}
                    </Typography>
                  </Tooltip>
                  <Typography  style = {{fontWeight: 600, fontSize: '1.5rem'}}>{txTypes.transact}</Typography>
                </TableCell>
                <TableCell style={rightPaddingFix}>
                  <BorderLinearProgress value={filledPercent} variant="determinate" />
                </TableCell>
                <TableCell>
                  <Typography  style = {{fontWeight: 600, fontSize: '1.5rem'}}>{hexToNumber(b.gasLimit)}</Typography>
                </TableCell>
                <TableCell style={rightPaddingFix}>
                  <Link
                    component={({
                      className,
                      children
                    }: {
                      children: any;
                      className: string;
                    }) => (
                      <RouterLink className={className}  style = {{fontWeight: 600, fontSize: '1.5rem', color: '#0528F2',}}  to={`/block/${b.hash}`}>
                        {children}
                      </RouterLink>
                    )}
                  >
                    {blockHashShort}
                  </Link>
                </TableCell>
              </TableRow>
              <div style  = {{height:'2rem'}}/>
              </>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default BlockList;
