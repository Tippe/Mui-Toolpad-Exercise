import * as React from "react";
import { Crud, DataModel, DataSource, DataSourceCache } from "@toolpad/core";
import { useLocation, useNavigate } from "react-router";
import { Check, Close } from "@mui/icons-material";
import { green, red } from "@mui/material/colors";

export interface Buddy extends DataModel {
  id: number;
  name: string;
  role: string;
  description: string;
  skills: string[];
  isActive: boolean;
}

let buddyStore: Buddy[] = [
  {
    id: 1,
    name: 'Lexi',
    role: 'Research Assistant',
    description: 'Helps gather and summarize information from various sources.',
    skills: ['search', 'summarization', 'citation'],
    isActive: true,
  },
  {
    id: 2,
    name: 'Codey',
    role: 'Code Reviewer',
    description: 'Reviews and suggests improvements to code snippets.',
    skills: ['typescript', 'linting', 'refactoring'],
    isActive: true,
  },
  {
    id: 3,
    name: 'Prompta',
    role: 'Prompt Engineer',
    description: 'Generates and optimizes prompts for AI interactions.',
    skills: ['prompt design', 'chatbots', 'OpenAI'],
    isActive: false,
  },
  {
    id: 4,
    name: 'Notely',
    role: 'Meeting Note Taker',
    description: 'Summarizes meeting transcripts and creates action items.',
    skills: ['transcription', 'summarization', 'todo generation'],
    isActive: true,
  },
];

export const buddysDataSource: DataSource<Buddy> = {
  fields: [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 2 },
    {
      field: 'skills',
      headerName: 'Skills',
      flex: 2,
      renderCell: (params) => params.value.join(', '),
    },
    {
      field: 'isActive',
      headerName: 'Active',
      type: 'boolean',
      renderCell: (params) =>
        params.value ? (
          <Check sx={{ color: green[600] }} />
        ) : (
          <Close sx={{ color: red[600] }} />
        ),
    },
  ],

  getMany: async ({ paginationModel, filterModel, sortModel }) => {
    // Simulate loading delay
    await new Promise((resolve) => {
      setTimeout(resolve, 750);
    });

    let processedBuddys = [...buddyStore];

    // Apply filters (demo only)
    if (filterModel?.items?.length) {
      filterModel.items.forEach(({ field, value, operator }) => {
        if (!field || value == null) {
          return;
        }

        processedBuddys = processedBuddys.filter((buddy) => {
          const buddyValue = buddy[field];

          switch (operator) {
            case 'contains':
              return String(buddyValue)
                .toLowerCase()
                .includes(String(value).toLowerCase());
            case 'equals':
              return buddyValue === value;
            case 'startsWith':
              return String(buddyValue)
                .toLowerCase()
                .startsWith(String(value).toLowerCase());
            case 'endsWith':
              return String(buddyValue)
                .toLowerCase()
                .endsWith(String(value).toLowerCase());
            case '>':
              return (buddyValue as number) > value;
            case '<':
              return (buddyValue as number) < value;
            default:
              return true;
          }
        });
      });
    }

    // Apply sorting
    if (sortModel?.length) {
      processedBuddys.sort((a, b) => {
        for (const { field, sort } of sortModel) {
          if ((a[field] as number) < (b[field] as number)) {
            return sort === 'asc' ? -1 : 1;
          }
          if ((a[field] as number) > (b[field] as number)) {
            return sort === 'asc' ? 1 : -1;
          }
        }
        return 0;
      });
    }

    // Apply pagination
    const start = paginationModel.page * paginationModel.pageSize;
    const end = start + paginationModel.pageSize;
    const paginatedBuddys = processedBuddys.slice(start, end);

    return {
      items: paginatedBuddys,
      itemCount: processedBuddys.length,
    };
  },

  getOne: async (buddyId) => {
    // Simulate loading delay
    await new Promise((resolve) => {
      setTimeout(resolve, 750);
    });

    const buddyToShow = buddyStore.find((buddy) => buddy.id === Number(buddyId));

    if (!buddyToShow) {
      throw new Error('Buddy not found');
    }
    return buddyToShow;
  },

  createOne: async (data) => {
    // Simulate loading delay
    await new Promise((resolve) => {
      setTimeout(resolve, 750);
    });

    const newBuddy = {
      id: buddyStore.reduce((max, buddy) => Math.max(max, buddy.id), 0) + 1,
      ...data,
    } as Buddy;

    buddyStore = [...buddyStore, newBuddy];

    return newBuddy;
  },

  updateOne: async (buddyId, data) => {
    // Simulate loading delay
    await new Promise((resolve) => {
      setTimeout(resolve, 750);
    });

    let updatedBuddy: Buddy | null = null;

    buddyStore = buddyStore.map((buddy) => {
      if (buddy.id === Number(buddyId)) {
        updatedBuddy = { ...buddy, ...data };
        return updatedBuddy;
      }
      return buddy;
    });

    if (!updatedBuddy) {
      throw new Error('Buddy not found');
    }
    return updatedBuddy;
  },

  deleteOne: async (buddyId) => {
    // Simulate loading delay
    await new Promise((resolve) => {
      setTimeout(resolve, 750);
    });

    buddyStore = buddyStore.filter((buddy) => buddy.id !== Number(buddyId));
  },

  validate: (formValues) => {
    let issues: { message: string; path: [keyof Buddy] }[] = [];

    if (!formValues.name) {
      issues.push({ message: 'Name is required', path: ['name'] });
    } else if (formValues.name.length < 3) {
      issues.push({ message: 'Name must be at least 3 characters long', path: ['name'] });
    }

    if (!formValues.role) {
      issues.push({ message: 'Role is required', path: ['role'] });
    }

    if (!formValues.description) {
      issues.push({ message: 'Description is required', path: ['description'] });
    }

    if (!Array.isArray(formValues.skills) || formValues.skills.length === 0) {
      issues.push({ message: 'At least one skill is required', path: ['skills'] });
    }

    return { issues };
  },
};

const buddysCache = new DataSourceCache();

export default function BuddyPage() {
    return (
        <Crud<Buddy>
            dataSource={buddysDataSource}
            dataSourceCache={buddysCache}
            rootPath="/buddys"
            initialPageSize={5}
            defaultValues={{ title: 'New Buddy' }}
        />
    )
}
