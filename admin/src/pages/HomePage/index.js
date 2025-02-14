import React, { memo, useEffect, useState } from "react";

import {
  Alert,
  BaseHeaderLayout,
  Box,
  ContentLayout,
} from "@strapi/design-system";
import { request } from "@strapi/helper-plugin";
import { useIntl } from "react-intl";
import styled from "styled-components";

import { PublishButton, PublishPrompt } from "../../components/HomePage";
import pluginId from "../../pluginId";

const POLL_INTERVAL = 10000;

const StyledAlert = styled(Alert)`
  button {
    display: none;
  }
`;

const HomePage = () => {
  const { formatMessage } = useIntl();
  const t = (id) => formatMessage({ id: `${pluginId}.home.${id}` });

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleError = (e = "Server error") => {
    console.error(e);
    setError(true);
  };

  const triggerPublish = async () => {
    setBusy(true);
    try {
      const res = await request(`/publish`, { method: "GET" });
      if (res?.success !== true) {
        handleError();
      }
    } catch (e) {
      handleError(e);
    } finally {
      handleClose();
    }
  };

  return (
    <Box>
      <BaseHeaderLayout
        title={t("title")}
        subtitle={t("description")}
        as="h2"
      />
      <ContentLayout>
        {error ? (
          <StyledAlert variant="danger" title={t("error.title")}>
            {t("error.description")}
          </StyledAlert>
        ) : (
          <PublishButton
            loading={busy}
            loadingMessage={t(busy ? "busy" : "notready")}
            buttonLabel={"Deploy"}
            onClick={handleOpen}
          />
        )}
      </ContentLayout>
      <PublishPrompt
        isOpen={isOpen}
        title={t("prompt.title")}
        description={t("prompt.description")}
        cancelLabel={t("buttons.cancel")}
        publishLabel={t("buttons.publish")}
        handleCancel={handleClose}
        handlePublish={triggerPublish}
      />
    </Box>
  );
};

export default memo(HomePage);
