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

  return (
    <div>
      <Button
        onClick={() => {
          history.push(`/block/${block.hash}/raw`);
        }}
        style={{ position: "absolute", right: "10px", top: "75px" }}
      >
        View Raw
      </Button>
      <Table >
        <TableBody style = {{maxWidth:'50vw'}}>
            
          <TableRow>
            <TableCell colSpan={2}><b>{t("Block")}</b></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{t("Number")}</TableCell>
            <TableCell>{hexToNumber(block.number)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t("Gas Usage")}</TableCell>
            <TableCell>
              <Typography variant="caption">
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
            <TableCell>{t("Timestamp")}</TableCell>
            <TableCell>
              {t("Timestamp Date", { date: hexToDate(timestamp) })}
            </TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell colSpan={2}> {t("Hash")}</TableCell>
          </TableRow>

          <TableRow style = {{maxWidth:'50vw'}}>
            <TableCell colSpan={2}  id = 'hash'>{hash}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={2}>{t("ParentHash")}</TableCell>
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
                  <RouterLink className={className} to={`/explorer/block/${parentHash}`} id = 'hash'>
                    {children}
                  </RouterLink>
                )}
              >
                {parentHash}
              </Link>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t("Gas Limit")}</TableCell>
            <TableCell>{hexToNumber(gasLimit)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t("Size")}</TableCell>
            <TableCell>{hexToNumber(size)}</TableCell>
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
