import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Typical from 'react-typical'
import Dashboard from '../components/Dashboard'
import ConfigurationMenu from "../containers/ConfigurationMenu";

import {
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  InputBase,
  Tooltip
} from "@material-ui/core";

import Brightness3Icon from "@material-ui/icons/Brightness3";
import NotesIcon from "@material-ui/icons/Notes";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import CodeIcon from "@material-ui/icons/Code";

import ServiceRunner, {
  ObjectOfStringDoaGddGAStringVp8AIgHFStringDoaGddGAUnorderedSetOfObjectOfStringDoaGddGAStringDoaGddGAKieCSt44UIuKSje3YY1BLmC3 as IAvailableServices
} from "@etclabscore/jade-service-runner-client"; //tslint:disable-line
import useServiceRunnerStore from "../stores/useServiceRunnerStore";
import useCoreGethStore from "../stores/useCoreGethStore";
import EthereumJSONRPC from "@etclabscore/ethereum-json-rpc";
import { useTranslation } from "react-i18next";
import ETHJSONSpec from "@etclabscore/ethereum-json-rpc-specification/openrpc.json";

import React, {
  Dispatch,
  ChangeEvent,
  KeyboardEvent,
  useState,
  useEffect
} from "react";

export default (props: any) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState();

interface IConfigurationMenuProps {
  onChange: (type: string, url: string) => any;
}

interface IPagedMenuProps {
  onChange: (type: string, url: string) => any;
}

const [etheriumURL, setEtheriumURL] = useState("");
const [selectedNetwork, setSelectedNetworkState] = useState();

  const [
    serviceRunner,
    serviceRunnerUrl,
    setServiceRunnerUrl,
    availableServices
  ]: [
    ServiceRunner,
    string,
    any,
    IAvailableServices[]
  ] = useServiceRunnerStore();
  const [erpc, setCoreGethUrlOverride]: [
    EthereumJSONRPC,
    Dispatch<string>
  ] = useCoreGethStore();

  
  const isAddress = (q: string): boolean => {
    const re = new RegExp(ETHJSONSpec.components.schemas.Address.pattern);
    return re.test(q);
  };

  const isKeccakHash = (q: string): boolean => {
    const re = new RegExp(ETHJSONSpec.components.schemas.Keccak.pattern);
    return re.test(q);
  };

  const isBlockNumber = (q: string): boolean => {
    const re = new RegExp(/^-{0,1}\d+$/);
    return re.test(q);
  };

  const handleSearch = async (qry: string | undefined) => {
    if (qry === undefined) {
      return;
    }
    const q = qry.trim();
    if (isAddress(q)) {
      props.history.push(`/explorer/address/${q}`);
    }
    if (isKeccakHash(q)) {
      let transaction;

      try {
        transaction = await erpc.eth_getTransactionByHash(q);
      } catch (e) {
        // do nothing
      }

      if (transaction) {
        props.history.push(`/explorer/tx/${q}`);
      }
      let block;
      try {
        block = await erpc.eth_getBlockByHash(q, false);
      } catch (e) {
        // do nothing
      }
      if (block) {
        props.history.push(`/explorer/block/${q}`);
      }
    }
    if (isBlockNumber(q)) {
      const block = await erpc.eth_getBlockByNumber(
        `0x${parseInt(q, 10).toString(16)}`,
        false
      );
      if (block) {
        props.history.push(`/explorer/block/${block.hash}`);
      }
    }
  };

  return (
    <>
    <div className = 'mobile-container'>
      <div>

          <div className = 'upload-cloud-graphic' style = {{width:'52rem'}}></div>
          <div className  = 'navbox-grid'>
            <div className = 'navbox'>
              <h1 className = 'title'>JSON-RPC API</h1>
              <p className = 'body'> The text is in Montserrat this time, though I remember something about Proxima Nova?</p>
              <a className = 'link' 
              onClick={() =>window.open("https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/etclabscore/ethereum-json-rpc-specification/master/openrpc.json" ) }
              > 
              <span /> <NotesIcon fontSize = 'large'/>Documentation <span /> </a>
            </div>            
            <span />
            <div className = 'navbox'>
              <h1 className = 'title'>Expedition Code</h1>
              <p className = 'body'> I know this text was blue in the original design, but I think the aesthetics of this is much better. </p>
              <a className = 'link' 
                    onClick={() => window.open("https://github.com/etclabscore/expedition")}
              >
                 <span /> <CodeIcon fontSize = 'large'/>Github <span /> </a>
            </div>            
            <div className = 'navbox'>
              <h1 className = 'title'>Service Runner RPC</h1>
              <p className = 'body'> The text is in Montserrat this time, though I remember something about Proxima Nova?</p>
              <input placeholder = 'URL' 
                value = {serviceRunnerUrl}
                onChange = {e => {setServiceRunnerUrl(e.target.value);}}/>
            </div>
            <span />
            <div className = 'navbox'>
              <h1 className = 'title'>Etherium RPC</h1>
              <p className = 'body'> The text is in Montserrat this time, though I remember something about Proxima Nova?</p>
              <input placeholder = 'URL' 
                value = {etheriumURL}
                onChange = {e => {setEtheriumURL(e.target.value); setCoreGethUrlOverride(e.target.value)}}/>
            </div>          
            <InputBase
                  placeholder={t(
                    "Enter an Address, Transaction Hash or Block Number"
                  )}
                  onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                    if (event.keyCode === 13) {
                      handleSearch(search);
                    }
                  }}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    if (event.target.value) {
                      const { value } = event.target;
                      setSearch(value as any);
                    }
                  }}
                  fullWidth
                  style={{
                    background: "rgba(0,0,0,0.1)",
                    borderRadius: "4px",
                    padding: "5px 10px 0px 10px",
                    marginRight: "5px",
                    gridColumnStart:1,
                    gridColumnEnd:-1,
                    height:'4rem'
                  }}
                />
          </div>
          </div>      


    </div>
    <div className = 'wedge' id = 'explorer-wedge' style = {{ minHeight:'50vh'}}></div>
    </>
  )
}
