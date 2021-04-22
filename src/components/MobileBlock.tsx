import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
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

function MobileBlock(props: any) {
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
    gasUsed,
    gasLimit,
    size
  } = block;

  const filledPercent = (hexToNumber(gasUsed) / hexToNumber(gasLimit)) * 100;
  const FontStyle = {fontWeight: 600, fontSize: '1.3rem'};

  return (
    <div>
      <Button
        onClick={() => {
          history.push(`/explorer/block/${block.hash}/raw`);
        }}
        style={{ position: "absolute", right: "10px", top: "75px" }}
      >
        View Raw
      </Button>
      <Table style = {FontStyle}>
        <TableBody style = {{maxWidth:'50vw'}}>
            
          <TableRow>
            <TableCell style = {FontStyle} colSpan={2}><b>{t("Block")}</b></TableCell>
          </TableRow>
          <TableRow>
            <TableCell style = {FontStyle}>{t("Number")}</TableCell>
            <TableCell style = {FontStyle}>{hexToNumber(block.number)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell style = {FontStyle}>{t("Gas Usage")}</TableCell>
            <TableCell>
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
            <TableCell style = {FontStyle} colSpan={2}> {t("Hash")}</TableCell>
          </TableRow>

          <TableRow style = {{maxWidth:'50vw'}}>
            <TableCell style = {FontStyle} colSpan={2}  id = 'hash'>{hash}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell style = {FontStyle} colSpan={2}>{t("ParentHash")}</TableCell>
          </TableRow>

          <TableRow>
          <TableCell colSpan={2}>
              <Link 
                component={({
                  className,
                  children
                }: {
                  children: any;
                  className: string;
                }) => (
                  <RouterLink style = {FontStyle} className={className} to={`/explorer/block/${parentHash}`} id = 'hash'>
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
          <TableCell></TableCell>
          <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default MobileBlock;
