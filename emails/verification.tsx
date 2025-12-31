import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
} from "@react-email/components";

// Shared styles
const containerStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: "32px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  fontFamily: "Inter, sans-serif",
};

const headingStyle: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: 700,
  marginBottom: "16px",
};

const textStyle: React.CSSProperties = {
  fontSize: "16px",
  color: "#555",
  lineHeight: "24px",
};

const otpBox: React.CSSProperties = {
  fontSize: "32px",
  fontWeight: 700,
  letterSpacing: "6px",
  textAlign: "center",
  background: "#f3f4f6",
  padding: "20px 0",
  borderRadius: "10px",
  margin: "24px 0",
  color: "#111",
};

export default function verificationEmail({
  username,
  code,
}: {
  username: string;
  code: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>Your Workora verification code</Preview>
      <Body style={{ backgroundColor: "#f7f7f7", padding: "32px" }}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>
            Welcome to Workora, {username}!
          </Heading>
          <Text style={textStyle}>
            Use the verification code below to complete your registration.
          </Text>

          <Section>
            <div style={otpBox}>{code}</div>
          </Section>

          <Hr />
          <Text style={{ fontSize: "14px", color: "#888" }}>
            This code expires in 1 hour.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
