import React from "react";
import { Box, Text, Button, VStack, HStack } from "@chakra-ui/react";
import { platforms } from "./Platforms";
import { IOSShareIcon, FireFoxA2HSIcon, MenuIcon, OperaA2HSIcon } from "./Icons";

function DialogActionWithInstructions(props) {
  return (
    <VStack width="100%" align="start" spacing={4}>
      <Box>
        <Text fontSize="lg" fontWeight="semibold">To install this app:</Text>
        <ul>
          <li>
            <HStack>
              {props.action1}
            </HStack>
          </li>
          <li>{props.action2}</li>
        </ul>
      </Box>
      <Box width="100%" textAlign="right">
        <Button onClick={props.onSubmit}>Ok</Button>
      </Box>
    </VStack>
  );
}

export default function InstallDialogAction(props) {
  return (
    <>
      {props.platform === platforms.NATIVE && (
        <HStack justify="end" padding={4}>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button onClick={props.onSubmit} colorScheme="blue" variant="solid">
            Install
          </Button>
        </HStack>
      )}
      {props.platform === platforms.IDEVICE && (
        <DialogActionWithInstructions
          action1={
            <>
              Tap the share button:
              <IOSShareIcon />
            </>
          }
          action2="then find and tap 'Add to Homescreen'"
          onSubmit={props.onSubmit}
        />
      )}
      {props.platform === platforms.FIREFOX && (
        <DialogActionWithInstructions
          action1={
            <>
              Tap this icon on the address bar:
              <FireFoxA2HSIcon />
            </>
          }
          action2="then tap '+Add to Homescreen'"
          onSubmit={props.onSubmit}
        />
      )}
      {props.platform === platforms.FIREFOX_NEW && (
        <DialogActionWithInstructions
          action1={
            <>
              Tap the menu button:
              <MenuIcon />
            </>
          }
          action2="then tap 'Install'"
          onSubmit={props.onSubmit}
        />
      )}
      {props.platform === platforms.OPERA && (
        <DialogActionWithInstructions
          action1={
            <>
              Tap the menu button:
              <MenuIcon />
            </>
          }
          action2={
            <>
              then tap &nbsp;'
              <OperaA2HSIcon />
              Home screen'
            </>
          }
          onSubmit={props.onSubmit}
        />
      )}
      {props.platform === platforms.OTHER && (
        <VStack width="100%" align="start" spacing={4}>
          <Text>Unfortunately the install feature is not supported by your browser.</Text>
          <Box width="100%" textAlign="right">
            <Button onClick={props.onClose}>Ok</Button>
          </Box>
        </VStack>
      )}
    </>
  );
}
