import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import TxList from "../TxList";
import { hexToDate, hexToNumber } from "@etclabscore/eserialize";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  LinearProgress,
  Typography
} from "@material-ui/core";

function BlockView(props: any) {
  const { block } = props;
  const history = useHistory();
  const { t } = useTranslation();

  if (!block) {
    return <div>Loading...</div>;
  }

  const {
    timestamp,
    hash,
    parentHash,
    transactions,
    gasUsed,
    gasLimit,
    size
  } = block;

  const filledPercent = (hexToNumber(gasUsed) / hexToNumber(gasLimit)) * 100;
  const FontStyle = {fontWeight: 600, fontSize: '1.5rem'};
  return (
    <div>
            <div style = {{height: '20rem'}} />
      <Button
        onClick={() => {
          history.push(`/block/${block.hash}/raw`);
        }}
        style={{ position: "absolute", right: "10px", top: "75px" }}
      >
        View Raw
      </Button>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell style = {FontStyle}>{t("Number")}</TableCell>
            <TableCell style = {FontStyle}>{hexToNumber(block.number)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell style = {FontStyle}>{t("Gas Usage")}</TableCell>
            <TableCell >
              <Typography style = {FontStyle} variant="caption">
                {hexToNumber(gasUsed)}/{hexToNumber(gasLimit)}
              </Typography>
              <LinearProgress
                style={{ width: "150px" }}
                value={filledPercent}
                variant="determinate"
              />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell style = {FontStyle}>{t("Timestamp")}</TableCell>
            <TableCell style = {FontStyle}>
              {t("Timestamp Date", { date: hexToDate(timestamp) })}
            </TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell style = {FontStyle}>{t("Hash")}</TableCell>
            <TableCell style = {FontStyle}>{hash}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell style = {FontStyle}>{t("ParentHash")}</TableCell>
            <TableCell>
              <Link
                component={({
                  className,
                  children
                }: {
                  children: any;
                  className: string;
                }) => (
                  <RouterLink style = {FontStyle} className={className} to={`/explorer/block/${parentHash}`}>
                    {children}
                  </RouterLink>
                )}
              >
                {parentHash}
              </Link>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell style = {FontStyle}>{t("Gas Limit")}</TableCell>
            <TableCell style = {FontStyle}>{hexToNumber(gasLimit)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell style = {FontStyle}>{t("Size")}</TableCell>
            <TableCell style = {FontStyle}>{hexToNumber(size)}</TableCell>
          </TableRow>
          <TableRow>
          <TableCell style = {FontStyle}><b style = {FontStyle}>{t("Transactions")}</b></TableCell>
          <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
        <TxList transactions={transactions} />
    </div>
  );
}

export default BlockView;
