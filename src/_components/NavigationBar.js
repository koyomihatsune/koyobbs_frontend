import * as React from 'react';
import { useNavigate, Link, NavLink} from "react-router-dom";
import { Pivot, PivotItem } from '@fluentui/react';
import { Row, Col } from 'react-simple-flex-grid';
import { Button, Menu, MenuTrigger, MenuPopover,MenuItem, MenuList, MenuButton} from "@fluentui/react-components";
import { AutoFitHeight20Filled, DocumentAdd20Regular, PersonRegular } from '@fluentui/react-icons';
import { AuthContext } from '../_contexts/AuthProvider';
import { Logout } from './auth/Logout';
import axios from 'axios';
import { API_LINK, HOSTNAME } from '../Constants';
import { useContext } from 'react';

const getTabId = (itemKey) => {
  return `ShapeColorPivot_${itemKey}`;
};

function NavigationBar(props) {
  const navigate = useNavigate();
  const {setAuth, setIsLogin, isLogin, auth} = useContext(AuthContext)
  const [mQuery, setMQuery] = React.useState({
    matches: window.innerWidth > 1000 ? true : false,
  });

  const checkAuth = async () => {
    console.log("checkAuthStarted")
    console.log(localStorage.getItem("authUser"))
      axios.get(HOSTNAME + API_LINK.REFRESH_TOKEN, {
        headers: {
          'Authorization': localStorage.getItem("authUser")==null ? "": "Bearer " + JSON.parse(localStorage.getItem("authUser")).token,
          'cc': 'abc'
        }
      }).then((res) => {
        console.log(res.data)
        if (res.data.status === "Success") {
          setAuth(res.data.data)
          setIsLogin(true)
          localStorage.setItem("authUser", JSON.stringify(res.data.data))
          return true
        } 
      })
  }

  React.useEffect(() => {
    checkAuth()
    let mediaQuery = window.matchMedia("(min-width: 768px)");
    mediaQuery.addListener(setMQuery);
    console.log(mQuery)
    return () => mediaQuery.removeListener(setMQuery);
  }, [isLogin]);

  return (
    <>
      {mQuery.matches && (<Row style={{paddingRight:5, paddingLeft: 5}}>
            <Col style={{textAlign:"left", width:"50%"}}><NavigationBarContent  navigate={navigate}/></Col>
            <Col style={{textAlign:"right", width:"50%"}}><CommandBar navigate={navigate}/></Col>
        </Row>)}
      {!mQuery.matches && (<div><CommandBar navigate={navigate}/><br/><NavigationBarContent  navigate={navigate}/>
        </div>)}
    </>
  );
}

function NavigationBarContent(props) {
  const [selectedKey, setSelectedKey] = React.useState("");
  const handleLinkClick = (item) => {
    if (item) {
      setSelectedKey(item.props.itemKey);
      props.navigate("/"+item.props.itemKey);
    }
  };

  return (
    <>
      <div>
      <Pivot
        selectedKey={selectedKey}
        onLinkClick={handleLinkClick}
        headersOnly={true}
        getTabId={getTabId}
      >
        <PivotItem headerText="Bulletin Board" itemKey="" />
        <PivotItem headerText="Profile" itemKey="me" />
        <PivotItem headerText="Test" itemKey="test" />
      </Pivot>
    </div>
    </>
  );
};

function CommandBar(props) {
  if (localStorage.getItem('authUser') != null ) {
    return <AuthCommandBar navigate={props.navigate}/>
  }
  else return <NoAuthCommandBar navigate={props.navigate}/>
}

function NoAuthCommandBar(props) {
    const ButtonStyle = {textDecoration: 'none', paddingRight:"5px"}
    return (
      <>
        <div>
            <NavLink to="/login" style={ButtonStyle}>
            <Button appearance="primary">
                Login to Boring Bulletin Site
            </Button>
            </NavLink>
        </div>
      </>
    );
  };

function AuthCommandBar(props) {
    const ButtonStyle = {textDecoration: 'none', paddingRight:"5px"}
    return (
      <>
        <div>
            <NavLink to="/new" style={ButtonStyle}>
            <Button icon={<DocumentAdd20Regular/>} appearance="primary">
                Post something new
            </Button>
            </NavLink>
            <Button icon={<PersonRegular/>}>
                {localStorage.getItem('authUser')!=null ? JSON.parse(localStorage.getItem('authUser')).user.username : "Anonymous"}
            </Button>
        </div>
      </>
    );
  };


export default NavigationBar;
