import { ProjectCard } from "../project-card";
import { useGetProjects } from "../../api/use-get-projects";
import styles from "./project-list.module.scss";
import { AlertMessage } from "@features/ui";
import { LoadingIcon } from "@features/ui";

export function ProjectList() {
  const { data, isLoading, isError, error, refetch } = useGetProjects();

  if (isLoading) {
    return (
      <div className={styles.loadingIcon}>
        <LoadingIcon />
      </div>
    );
  }

  if (isError) {
    console.error(error);
    return (
      <AlertMessage
        iconSrc="/icons/alert-circle.svg"
        actionText="Try again"
        action={refetch}
      >
        There was a problem while loading the project data
      </AlertMessage>
    );
  }

  return (
    <ul className={styles.list}>
      {data?.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
