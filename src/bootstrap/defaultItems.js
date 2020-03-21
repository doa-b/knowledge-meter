export const skillTree = {
    'HTML':
        {
            '(X)HTML': 1,
            'HTML5': 1,
        },
    'CSS':
        {
            'Less': 1,
            'Sass': 1

        }
};

export const skills = {
    HTML: ['XHTML', 'HTML5', 'XML'],
    CSS: ['Less', 'Sass', 'CSS3'],
    PHP: ['PHP', 'CakePHP', 'Codeigniter', 'FuelPHP', 'Smarty', 'Kohana', 'Doctrine'],
    EcoSystem: ['Laravel', 'Symfony', 'Phalcon', 'Spring'],
    JavaScript: ['JavaScript', 'TypeScript', 'ES5', 'ES6', 'Node', 'Mootools'],
    Design: ['PhotoShop', 'Indesign', 'Illustrator', 'Sketch', 'Adobe XD'],
    CMS: ['Drupal', 'WordPress', 'Joomla', 'Drupal', 'Umbraco', 'Mambo', 'Typo3', 'CraftCMS', 'Expression Engine'],
    Ecommerce: ['Magento', 'Open Cart', 'WooCommerce', 'Shopify'],
    Linux: ['Ubunru', 'Bash', 'Puppet', 'Vagrant', 'Ansible', 'AWS'],

    Webserver: ['Apache', 'Nginx', 'Lucian/SolR'],
    Tools: ['Varnish', 'ElasticSearch', 'Twig template', 'Twig template'],
    Database: ['MySQL', 'NoSQL', 'SQLite', 'MongoDB', 'PostgreSQL', 'SOLR', 'Redis,',
        'CouchBase'],
    Testing: ['PHPunit', 'TDD', 'BDD', 'Acceptance Testing'],
   // Skills: ['Design', 'UX/UI'],
    Modelling: ['UML', 'MVC', 'OOP'],
    Network: ['JSON', 'AJAX', 'REST', 'SOAP'],
   // Other: ['Saas', 'W3C'],
    OS: ['Linux', 'MacOS', 'Windows'],
    FrameWork: ['Bootstrap', 'Webpack', 'Material Design', 'JQuery', 'Angular', 'React', 'Vue',
        'Ionic', 'Ember', 'Redux', 'Router', 'Meteor', 'Grunt', 'Gulp', 'Sails', 'Backbone', 'Zend', 'Yii',
        'Ruby on Rails', 'Django', 'Flask'],
    Development: ['Docker', 'Git', 'Continuous Intergration', 'Automatic Deployment',
        'Agile', 'SCRUM', 'Kanban', 'Jira', 'Tiaga', 'Remine', 'Trac', 'Trello',
        'Target Process', 'NPM', 'Yarn', 'Composer', 'ELK'],
    Language: ['Python', 'Perl', 'Ruby', 'Java', '.NET', 'ASP',
        'Visual Basic', 'C#', 'C++', 'C', 'Swift', 'Bash', 'Groovy', 'Lua', 'Go', 'Xcode'],
    IDE: ['Sublime Text', 'VI(M)', 'PHP Storm', 'Netbeans','Zend Studio', 'Intellij']

};

export const INITIAL_VALUE = 1;

export const fetchSkillTree = () => {
    const skillTreeObject = {};
    let skillList = {};
    for (let group in skills) {
        if (!skills.hasOwnProperty(group)) continue;
        skillList = {};
        skills[group].map((skill) => {
            return skillList[skill] = INITIAL_VALUE
        });
        skillTreeObject[group] = skillList
    }
    console.log('this is your skillTree');
    console.log(skillTreeObject);
    return skillTreeObject
};