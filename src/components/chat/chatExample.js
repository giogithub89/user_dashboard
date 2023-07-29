import { Avatar, Box, InputBase, Typography, useTheme } from "@mui/material";
import React from "react";

import "react-chat-elements/dist/main.css";
import { ChatList } from "react-chat-elements";
import { MessageList } from "react-chat-elements";
import { tokens } from "../../theme";
import ContainedButton from "../../components/buttons/ContainedButton";
import InputCustomBase from "../../components/inputBase/InputCustomBase";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ChatsExample = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box display="flex" marginTop="10px">
      <Box
        width="30%"
        backgroundColor={colors.primary[800]}
        maxHeight="88vh"
        p="10px 20px"
        borderRight="1px solid"
        borderColor={colors.primary[1000]}>
        <Box display="flex" flexDirection="column">
          <Typography variant="h2" m="10px 0">
            Chat
          </Typography>
          <InputCustomBase m={"10px 0px"} />

          <ChatList
            className="chat-list"
            dataSource={[
              {
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                alt: "kursat_avatar",
                title: "Kursat",
                subtitle: "Why don't we go to the No Way Home movie this weekend ?",
                date: new Date(),
                unread: 3,
              },
            ]}
          />
        </Box>
      </Box>
      <Box width="70%" backgroundColor={colors.primary[800]} display="flex" flexDirection="column">
        <Box height="10vh" display="flex" alignItems="center" p="0 20px">
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
          <Typography variant="h4" marginLeft="20px">
            Francesco Zagra
          </Typography>
        </Box>
        <Box backgroundColor={colors.primary[1000]} p="10px" height="68vh">
          <MessageList
            className="message-list"
            lockable={true}
            toBottomHeight={"100%"}
            dataSource={[
              {
                position: "left",
                type: "text",
                title: "Kursat",
                text: "Give me a message list example !",
              },
              {
                position: "right",
                type: "text",
                title: "Emre",
                text: "That's all.",
              },
            ]}
          />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between" height="10vh" p="0 10px">
          <InputBase
            fullWidth
            placeholder="Scrivi..."
            sx={{
              backgroundColor: colors.primary[1000],
              p: "10px",
              marginRight: "20px",
              borderRadius: "10px",
            }}></InputBase>
          <ContainedButton text={"Invia"} variant="contained" />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatsExample;
