import { getSession } from "@/app/api/auth/[...nextauth]/options";
import PostJobForm from "@/components/postjob-form";
import UserModel from "@/models/User";

const getCompany = async (id: string) => {
  const user = await UserModel.findById(id).select("company");
  return user?.company;
};

export default async function PostJobPage() {
  const session = await getSession();
  if (!session || session.user.accountType !== "employer") {
    return (
      <section className="container py-10">
        <h1 className="text-3xl font-bold">Unauthorized</h1>
        <p className="text-muted-foreground">
          You are not authorized to view this page.
        </p>
      </section>
    );
  }

  const company = await getCompany(session.user.id); 

  return <PostJobForm company={company} />;
}
