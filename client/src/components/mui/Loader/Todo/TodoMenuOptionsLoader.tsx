import { Box, Skeleton, Stack } from "@mui/material";
import React from "react";

const TodoMenuOptionsLoader = () => {
  // const height = 30;
  const animation: "pulse" | "wave" | boolean = "pulse";
  return (
    <Box
      className="nav-link list-actions"
      component={"a"}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      
    >
      <Stack gap={1} direction={"row"} alignItems={"center"} sx={{ width: "80%"}}>
        <Skeleton
          variant={"rounded"}
          animation={animation}
          width={24}
          height={24}
        />
        <Skeleton
          variant={"text"}
          animation={animation}
          width={"80%"}
          sx={{ fontSize: "0.875rem" }}
        />
      </Stack>
      <Skeleton
        variant={"circular"}
        animation={animation}
        width={24}
        height={24}
        // sx={{ fontSize: "0.875rem" }}
      />
    </Box>
  );
};

export default TodoMenuOptionsLoader;
