import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ApplicationSubmittedEmailProps {
  employerName: string;
  applicantName: string;
  applicantEmail: string;
  jobTitle: string;
  companyName: string;
  appliedDate: string;
  dashboardUrl: string;
  coverLetter?: string;
  resumeUrl: string;
}

export default function ApplicationSubmittedEmail({
  employerName,
  applicantName,
  applicantEmail,
  jobTitle,
  companyName,
  appliedDate,
  dashboardUrl,
  coverLetter,
  resumeUrl,
}: ApplicationSubmittedEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New application received for {jobTitle}</Preview>

      <Body style={body}>
        <Container style={container}>
          <Heading style={heading}>New Job Application Received</Heading>

          <Text style={text}>Hello {employerName},</Text>

          <Text style={text}>
            A new candidate has applied for the position of{" "}
            <strong>{jobTitle}</strong> at <strong>{companyName}</strong>.
          </Text>

          {/* Applicant Info */}
          <Section style={infoBox}>
            <Text style={infoText}>
              <strong>Name:</strong> {applicantName}
            </Text>
            <Text style={infoText}>
              <strong>Email:</strong> {applicantEmail}
            </Text>
            <Text style={infoText}>
              <strong>Applied On:</strong> {appliedDate}
            </Text>
          </Section>

          {/* Resume */}
          <Section style={{ marginTop: "24px" }}>
            <Heading style={sectionHeading}>Resume</Heading>

            <Button href={resumeUrl} style={secondaryButton}>
              Download Resume
            </Button>

            <Text style={smallText}>
              Or view online:{" "}
              <a href={resumeUrl} style={link}>
                {resumeUrl}
              </a>
            </Text>
          </Section>

          {/* Cover Letter */}
          {coverLetter && (
            <Section style={{ marginTop: "24px" }}>
              <Heading style={sectionHeading}>Cover Letter</Heading>

              <Section style={coverLetterBox}>
                {coverLetter.split("\n").map((line, index) => (
                  <Text key={index} style={coverLetterText}>
                    {line}
                  </Text>
                ))}
              </Section>
            </Section>
          )}

          {/* Dashboard CTA */}
          <Section style={buttonContainer}>
            <Button href={dashboardUrl} style={primaryButton}>
              View Full Application
            </Button>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            You are receiving this email because you posted a job on Workora.
          </Text>

          <Text style={footer}>
            © {new Date().getFullYear()} Workora. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

/* ------------------ Styles ------------------ */

const body = {
  backgroundColor: "#f4f4f5",
  fontFamily: "Inter, Arial, sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  padding: "24px",
  borderRadius: "8px",
  maxWidth: "600px",
  margin: "0 auto",
};

const heading = {
  fontSize: "22px",
  fontWeight: "600",
  marginBottom: "16px",
};

const sectionHeading = {
  fontSize: "16px",
  fontWeight: "600",
  marginBottom: "8px",
};

const text = {
  fontSize: "14px",
  color: "#333",
  lineHeight: "1.6",
};

const infoBox = {
  backgroundColor: "#f9fafb",
  padding: "16px",
  borderRadius: "6px",
  marginTop: "16px",
};

const infoText = {
  fontSize: "14px",
  margin: "4px 0",
};

const coverLetterBox = {
  backgroundColor: "#f9fafb",
  padding: "16px",
  borderRadius: "6px",
  marginTop: "8px",
};

const coverLetterText = {
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0 0 10px 0",
  whiteSpace: "pre-wrap" as const,
};

const buttonContainer = {
  textAlign: "center" as const,
  marginTop: "32px",
};

const primaryButton = {
  backgroundColor: "#2563eb",
  color: "#ffffff",
  padding: "12px 20px",
  borderRadius: "6px",
  fontSize: "14px",
  textDecoration: "none",
};

const secondaryButton = {
  backgroundColor: "#e5e7eb",
  color: "#111827",
  padding: "10px 16px",
  borderRadius: "6px",
  fontSize: "14px",
  textDecoration: "none",
  display: "inline-block",
};

const smallText = {
  fontSize: "12px",
  color: "#6b7280",
  marginTop: "8px",
};

const link = {
  color: "#2563eb",
};

const hr = {
  margin: "32px 0",
};

const footer = {
  fontSize: "12px",
  color: "#6b7280",
};
