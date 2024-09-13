import React from "react";
import TicketCard from "./TicketCard";

const KanbanBoard = ({ tickets, groupBy, sortBy }) => {
  // Ensure tickets is an array
  if (!Array.isArray(tickets) || tickets.length === 0) {
    return <div>No tickets available</div>; // Handle empty or non-array tickets gracefully
  }

  // Group tickets based on the selected criteria (status, user, priority)
  const groupedTickets = tickets.reduce((groups, ticket) => {
    const groupKey = ticket[groupBy] || "No Group";
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(ticket);
    return groups;
  }, {});

  // Sort tickets within each group
  Object.keys(groupedTickets).forEach((group) => {
    groupedTickets[group] = groupedTickets[group].sort((a, b) => {
      if (sortBy === "priority") {
        return b.priority - a.priority; // Descending order by priority
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title); // Ascending order by title
      }
      return 0;
    });
  });

  return (
    <div className="kanban-board">
      {Object.keys(groupedTickets).map((group) => (
        <div key={group} className="kanban-column">
          <h2>{group}</h2>
          {groupedTickets[group].map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
