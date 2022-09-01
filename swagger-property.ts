export const SWAGGER_PROPERTY = {
    PORTFOLIO: {
        SELF: {
            description: 'Portfolio SCHEMA',
            example: 'Portfolio object'
        },

        ID: {
            description: 'id',
            example: '6310765d24bdffe0e4caafd0'
        },

        TITLE: {
            description: 'Author name',
            example: 'title'
        },

        DATE: {
            description: 'Created date',
            example: new Date(Date.now())
        },

        DESCRIPTION: {
            description: 'Description (in MARK DOWN format only)',
            example: 'Hi there. [@megasaab](https://github.com/megasaab) here!\n' +
                '\n' +
                '- 🔭 Software Engineer with 3 years of experience.\n' +
                '- Love **Programming** on my free time.\n' +
                '- ❤️ **Docker** 🐳\n' +
                '- You should definitely check out my best project - [LeetCode BOT](https://github.com/madrigals1/leetcode_bot)\n' +
                '- [LeetCode](https://leetcode.com/madrigals1/) enjoyer\n' +
                '\n' +
                'Tech Stack\n' +
                '\n' +
                '- 💻 Programming Languages - **Python, JavaScript (TypeScript), C#, Scala**\n' +
                '- 🌐 Web Frameworks - **Django, React, Odoo, NodeJS**\n' +
                '- 🛢 Database - **PostgreSQL, MySQL**\n' +
                '- 🎮 Game Development - **Construct 2, Unity, JavaFX**\n' +
                '- 🔘 Other - **Docker, Grafana, Kibana**'
        },

        ADDITIONAL_LINKS: {
            description: 'Additional links',
            example: '[https://github.com/megasaab]'
        },

        LOGO: {
            description: 'Logo in Base64',
            example: 'base64logo here'
        },

        PROJECTS: {
            description: 'Projects ids []',
            example: '[6310765d24bdffe0e4caafd0, 6310765d24bdffe0e4caf2d0]'
        },

        WORK_EXPERIENCE: {
            description: 'Work experiences in mark down (in MARK DOWN format only)',
            example: {
                date: '12.05.16 - 14.04.17',
                title: 'Agoda company',
                description: '\'- Develop more interesting things\\n\' +\n' +
                    '            \'- Use javaScript\\n\' +\n'
            }
        }
    },

    USER: {
        LOGIN: {
            description: 'Login',
            example: 'login'
        },

        PASSWORD: {
            description: 'Password',
            example: 'password123'
        },

        PHONE: {
            description: 'Phone',
            example: '+7771000000'
        },

        EMAIL: {
            description: 'Email',
            example: 'example@mail.ru'
        }
    }
}
