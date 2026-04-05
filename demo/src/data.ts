import type { NestedNode } from 'react-apextree';

/**
 * basic org chart data
 */
export const basicOrgData: NestedNode = {
  id: '1',
  name: 'CEO',
  data: undefined,
  children: [
    {
      id: '2',
      name: 'CTO',
      data: undefined,
      children: [
        { id: '3', name: 'Dev Lead', data: undefined, children: [] },
        { id: '4', name: 'QA Lead', data: undefined, children: [] },
      ],
    },
    {
      id: '5',
      name: 'CFO',
      data: undefined,
      children: [
        { id: '6', name: 'Accountant', data: undefined, children: [] },
      ],
    },
    {
      id: '7',
      name: 'COO',
      data: undefined,
      children: [
        { id: '8', name: 'HR Manager', data: undefined, children: [] },
        { id: '9', name: 'Office Manager', data: undefined, children: [] },
      ],
    },
  ],
};

/**
 * data with profile info for custom templates
 */
export interface PersonData {
  name: string;
  title: string;
  imageURL: string;
}

export const teamData: NestedNode<PersonData> = {
  id: 'ceo',
  name: 'CEO',
  data: {
    name: 'Sarah Chen',
    title: 'CEO',
    imageURL: 'https://i.pravatar.cc/300?img=48',
  },
  children: [
    {
      id: 'cto',
      name: 'CTO',
      data: {
        name: 'Michael Torres',
        title: 'CTO',
        imageURL: 'https://i.pravatar.cc/300?img=68',
      },
      children: [
        {
          id: 'dev1',
          name: 'Senior Dev',
          data: {
            name: 'Emily Park',
            title: 'Senior Dev',
            imageURL: 'https://i.pravatar.cc/300?img=45',
          },
          children: [],
        },
        {
          id: 'dev2',
          name: 'Senior Dev',
          data: {
            name: 'James Wilson',
            title: 'Senior Dev',
            imageURL: 'https://i.pravatar.cc/300?img=52',
          },
          children: [],
        },
      ],
    },
    {
      id: 'cfo',
      name: 'CFO',
      data: {
        name: 'Lisa Anderson',
        title: 'CFO',
        imageURL: 'https://i.pravatar.cc/300?img=44',
      },
      children: [
        {
          id: 'acc1',
          name: 'Accountant',
          data: {
            name: 'David Kim',
            title: 'Accountant',
            imageURL: 'https://i.pravatar.cc/300?img=59',
          },
          children: [],
        },
      ],
    },
  ],
};

/**
 * data with custom node styling.
 * Per-node options are cast via `unknown` because the core NestedNode.options
 * type is the full intersection (all fields required), but core only reads the
 * fields that are actually provided at runtime.
 */
type NodeOpts = NestedNode['options'];

function nodeOpts(o: {
  nodeBGColor?: string;
  borderColor?: string;
  fontColor?: string;
}): NodeOpts {
  return o as unknown as NodeOpts;
}

export const styledTreeData: NestedNode = {
  id: 'root',
  name: 'Species',
  data: undefined,
  options: nodeOpts({ nodeBGColor: '#e8f5e9', borderColor: '#4caf50', fontColor: '#2e7d32' }),
  children: [
    {
      id: 'plants',
      name: 'Plants',
      data: undefined,
      options: nodeOpts({ nodeBGColor: '#c8e6c9', borderColor: '#66bb6a', fontColor: '#388e3c' }),
      children: [
        {
          id: 'trees',
          name: 'Trees',
          data: undefined,
          options: nodeOpts({ nodeBGColor: '#a5d6a7', borderColor: '#81c784' }),
          children: [],
        },
        {
          id: 'flowers',
          name: 'Flowers',
          data: undefined,
          options: nodeOpts({ nodeBGColor: '#f8bbd9', borderColor: '#f06292' }),
          children: [],
        },
      ],
    },
    {
      id: 'animals',
      name: 'Animals',
      data: undefined,
      options: nodeOpts({ nodeBGColor: '#bbdefb', borderColor: '#42a5f5', fontColor: '#1565c0' }),
      children: [
        {
          id: 'mammals',
          name: 'Mammals',
          data: undefined,
          options: nodeOpts({ nodeBGColor: '#90caf9', borderColor: '#64b5f6' }),
          children: [],
        },
        {
          id: 'birds',
          name: 'Birds',
          data: undefined,
          options: nodeOpts({ nodeBGColor: '#ffe0b2', borderColor: '#ffb74d' }),
          children: [],
        },
        {
          id: 'fish',
          name: 'Fish',
          data: undefined,
          options: nodeOpts({ nodeBGColor: '#b2ebf2', borderColor: '#4dd0e1' }),
          children: [],
        },
      ],
    },
    {
      id: 'fungi',
      name: 'Fungi',
      data: undefined,
      options: nodeOpts({ nodeBGColor: '#f3e5f5', borderColor: '#ba68c8', fontColor: '#7b1fa2' }),
      children: [],
    },
  ],
};

/**
 * larger tree for expand/collapse demo
 */
export const expandableTreeData: NestedNode = {
  id: 'company',
  name: 'TechCorp Inc.',
  data: undefined,
  children: [
    {
      id: 'engineering',
      name: 'Engineering',
      data: undefined,
      children: [
        {
          id: 'frontend',
          name: 'Frontend',
          data: undefined,
          children: [
            { id: 'fe1', name: 'React Team', data: undefined, children: [] },
            { id: 'fe2', name: 'Vue Team', data: undefined, children: [] },
          ],
        },
        {
          id: 'backend',
          name: 'Backend',
          data: undefined,
          children: [
            { id: 'be1', name: 'API Team', data: undefined, children: [] },
            { id: 'be2', name: 'Database Team', data: undefined, children: [] },
          ],
        },
        {
          id: 'devops',
          name: 'DevOps',
          data: undefined,
          children: [
            { id: 'do1', name: 'Cloud Team', data: undefined, children: [] },
            { id: 'do2', name: 'Security Team', data: undefined, children: [] },
          ],
        },
      ],
    },
    {
      id: 'product',
      name: 'Product',
      data: undefined,
      children: [
        { id: 'pm1', name: 'Product Managers', data: undefined, children: [] },
        { id: 'design', name: 'Design', data: undefined, children: [] },
      ],
    },
    {
      id: 'sales',
      name: 'Sales',
      data: undefined,
      children: [
        { id: 's1', name: 'Enterprise', data: undefined, children: [] },
        { id: 's2', name: 'SMB', data: undefined, children: [] },
      ],
    },
  ],
};

/**
 * data with tooltip content
 */
export interface TooltipPersonData {
  name: string;
  role: string;
  email: string;
  department: string;
}

export const tooltipData: NestedNode<TooltipPersonData> = {
  id: 'ceo',
  name: 'CEO',
  data: {
    name: 'Alexandra Wright',
    role: 'Chief Executive Officer',
    email: 'a.wright@company.com',
    department: 'Executive',
  },
  children: [
    {
      id: 'vp1',
      name: 'VP Engineering',
      data: {
        name: 'Robert Chen',
        role: 'VP of Engineering',
        email: 'r.chen@company.com',
        department: 'Engineering',
      },
      children: [
        {
          id: 'mgr1',
          name: 'Eng Manager',
          data: {
            name: 'Jennifer Lee',
            role: 'Engineering Manager',
            email: 'j.lee@company.com',
            department: 'Engineering',
          },
          children: [],
        },
        {
          id: 'mgr2',
          name: 'Eng Manager',
          data: {
            name: 'Thomas Brown',
            role: 'Engineering Manager',
            email: 't.brown@company.com',
            department: 'Engineering',
          },
          children: [],
        },
      ],
    },
    {
      id: 'vp2',
      name: 'VP Marketing',
      data: {
        name: 'Maria Garcia',
        role: 'VP of Marketing',
        email: 'm.garcia@company.com',
        department: 'Marketing',
      },
      children: [
        {
          id: 'mgr3',
          name: 'Mkt Manager',
          data: {
            name: 'Kevin Smith',
            role: 'Marketing Manager',
            email: 'k.smith@company.com',
            department: 'Marketing',
          },
          children: [],
        },
      ],
    },
  ],
};
