import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typical from 'react-typical'
import Dashboard from "../components/Dashboard";

import * as React from "react";

export default (props: any) => {

    const TypingAnimation = React.memo(() => {
        return <Typical
            steps={['Blockchain App', 3000, 'Supply Chain', 3000, 'Healthcare App', 3000]}
            loop={Infinity}
            wrapper="span"
        />

    }, (props, prevProp) => true); // this line prevent re rendering



    return (<>
        <Box pt={20} pb={5}>
            <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="textPrimary">
                    Blazing fast Cloud
                    hosting for your <br />
                    <Typography component="h1" variant="h2" align="center" color="textSecondary" >
                        <TypingAnimation />
                    </Typography>
                </Typography>
            </Container>
        </Box>
        <Box p={5}>

            <Container maxWidth="md">
                <Typography variant="h5" align="center" color="textPrimary" paragraph>
                    Connect your metamask or web3 client to
              </Typography>
                <Typography color="textSecondary" variant="h5" align="center" paragraph>
                    https://chain.token.ax
                </Typography>
                <Typography variant="h5" align="center" color="textPrimary" paragraph>

                    to start using the free cloud hosted Token.ax chain.
            </Typography>
            </Container>
        </Box>

        <Dashboard />
    </>
    )
}