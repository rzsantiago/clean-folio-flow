
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { MainSection } from "@/components/MainContent";

const Index = () => {
  const [main, setMain] = useState<MainSection>({ type: "gallery", filter: null });

  return <AppLayout main={main} setMain={setMain} />;
};

export default Index;
