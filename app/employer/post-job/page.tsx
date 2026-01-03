import PostJobForm from "@/components/postjob-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PostJobPage() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Post a Job</CardTitle>
        </CardHeader>

        <CardContent>
          <PostJobForm />
        </CardContent>
      </Card>
    </section>
  );
}
