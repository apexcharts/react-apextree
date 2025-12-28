import type { NodeData } from 'react-apextree';

/**
 * basic org chart data
 */
export const basicOrgData: NodeData = {
  id: '1',
  name: 'CEO',
  children: [
    {
      id: '2',
      name: 'CTO',
      children: [
        { id: '3', name: 'Dev Lead' },
        { id: '4', name: 'QA Lead' },
      ],
    },
    {
      id: '5',
      name: 'CFO',
      children: [
        { id: '6', name: 'Accountant' },
      ],
    },
    {
      id: '7',
      name: 'COO',
      children: [
        { id: '8', name: 'HR Manager' },
        { id: '9', name: 'Office Manager' },
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

export const teamData: NodeData<PersonData> = {
  id: 'ceo',
  data: {
    name: 'Sarah Chen',
    title: 'CEO',
    imageURL: 'https://i.pravatar.cc/300?img=48',
  },
  children: [
    {
      id: 'cto',
      data: {
        name: 'Michael Torres',
        title: 'CTO',
        imageURL: 'https://i.pravatar.cc/300?img=68',
      },
      children: [
        {
          id: 'dev1',
          data: {
            name: 'Emily Park',
            title: 'Senior Dev',
            imageURL: 'https://i.pravatar.cc/300?img=45',
          },
        },
        {
          id: 'dev2',
          data: {
            name: 'James Wilson',
            title: 'Senior Dev',
            imageURL: 'https://i.pravatar.cc/300?img=52',
          },
        },
      ],
    },
    {
      id: 'cfo',
      data: {
        name: 'Lisa Anderson',
        title: 'CFO',
        imageURL: 'https://i.pravatar.cc/300?img=44',
      },
      children: [
        {
          id: 'acc1',
          data: {
            name: 'David Kim',
            title: 'Accountant',
            imageURL: 'https://i.pravatar.cc/300?img=59',
          },
        },
      ],
    },
  ],
};

/**
 * data with custom node styling
 */
export const styledTreeData: NodeData = {
  id: 'root',
  name: 'Species',
  options: {
    nodeBGColor: '#e8f5e9',
    borderColor: '#4caf50',
    fontColor: '#2e7d32',
  },
  children: [
    {
      id: 'plants',
      name: 'Plants',
      options: {
        nodeBGColor: '#c8e6c9',
        borderColor: '#66bb6a',
        fontColor: '#388e3c',
      },
      children: [
        {
          id: 'trees',
          name: 'Trees',
          options: {
            nodeBGColor: '#a5d6a7',
            borderColor: '#81c784',
          },
        },
        {
          id: 'flowers',
          name: 'Flowers',
          options: {
            nodeBGColor: '#f8bbd9',
            borderColor: '#f06292',
          },
        },
      ],
    },
    {
      id: 'animals',
      name: 'Animals',
      options: {
        nodeBGColor: '#bbdefb',
        borderColor: '#42a5f5',
        fontColor: '#1565c0',
      },
      children: [
        {
          id: 'mammals',
          name: 'Mammals',
          options: {
            nodeBGColor: '#90caf9',
            borderColor: '#64b5f6',
          },
        },
        {
          id: 'birds',
          name: 'Birds',
          options: {
            nodeBGColor: '#ffe0b2',
            borderColor: '#ffb74d',
          },
        },
        {
          id: 'fish',
          name: 'Fish',
          options: {
            nodeBGColor: '#b2ebf2',
            borderColor: '#4dd0e1',
          },
        },
      ],
    },
    {
      id: 'fungi',
      name: 'Fungi',
      options: {
        nodeBGColor: '#f3e5f5',
        borderColor: '#ba68c8',
        fontColor: '#7b1fa2',
      },
    },
  ],
};

/**
 * larger tree for expand/collapse demo
 */
export const expandableTreeData: NodeData = {
  id: 'company',
  name: 'TechCorp Inc.',
  children: [
    {
      id: 'engineering',
      name: 'Engineering',
      children: [
        {
          id: 'frontend',
          name: 'Frontend',
          children: [
            { id: 'fe1', name: 'React Team' },
            { id: 'fe2', name: 'Vue Team' },
          ],
        },
        {
          id: 'backend',
          name: 'Backend',
          children: [
            { id: 'be1', name: 'API Team' },
            { id: 'be2', name: 'Database Team' },
          ],
        },
        {
          id: 'devops',
          name: 'DevOps',
          children: [
            { id: 'do1', name: 'Cloud Team' },
            { id: 'do2', name: 'Security Team' },
          ],
        },
      ],
    },
    {
      id: 'product',
      name: 'Product',
      children: [
        { id: 'pm1', name: 'Product Managers' },
        { id: 'design', name: 'Design' },
      ],
    },
    {
      id: 'sales',
      name: 'Sales',
      children: [
        { id: 's1', name: 'Enterprise' },
        { id: 's2', name: 'SMB' },
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

export const tooltipData: NodeData<TooltipPersonData> = {
  id: 'ceo',
  data: {
    name: 'Alexandra Wright',
    role: 'Chief Executive Officer',
    email: 'a.wright@company.com',
    department: 'Executive',
  },
  children: [
    {
      id: 'vp1',
      data: {
        name: 'Robert Chen',
        role: 'VP of Engineering',
        email: 'r.chen@company.com',
        department: 'Engineering',
      },
      children: [
        {
          id: 'mgr1',
          data: {
            name: 'Jennifer Lee',
            role: 'Engineering Manager',
            email: 'j.lee@company.com',
            department: 'Engineering',
          },
        },
        {
          id: 'mgr2',
          data: {
            name: 'Thomas Brown',
            role: 'Engineering Manager',
            email: 't.brown@company.com',
            department: 'Engineering',
          },
        },
      ],
    },
    {
      id: 'vp2',
      data: {
        name: 'Maria Garcia',
        role: 'VP of Marketing',
        email: 'm.garcia@company.com',
        department: 'Marketing',
      },
      children: [
        {
          id: 'mgr3',
          data: {
            name: 'Kevin Smith',
            role: 'Marketing Manager',
            email: 'k.smith@company.com',
            department: 'Marketing',
          },
        },
      ],
    },
  ],
};
