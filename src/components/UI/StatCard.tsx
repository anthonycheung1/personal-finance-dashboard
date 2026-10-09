type StatCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  className?: string;
};

function StatCard(props: StatCardProps) {
  return (
    <article className={`stat-card ${props.className ?? ''}`}>
      <h3>{props.title}</h3>

      <p className="stat-card-value">
        {props.value}
      </p>

      {props.subtitle && (
        <p className="stat-card-subtitle">
          {props.subtitle}
        </p>
      )}
    </article>
  );
}

export default StatCard;