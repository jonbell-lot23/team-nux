import dynamic from "next/dynamic";

const TestRunsNUX = dynamic(() => import("./TestRunsNUX.client"), {
  ssr: false,
});

export default function Page() {
  return <TestRunsNUX />;
}
