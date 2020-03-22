export const skills = {
    HTML: ['XHTML', 'HTML5', 'XML'],
    CSS: ['Less', 'Sass', 'CSS3'],
    OS: ['Linux', 'MacOS', 'Windows'],
    Modelling: ['UML', 'MVC', 'OOP'],
    Webserver: ['Apache', 'Nginx', 'Lucian/SolR'],
    EcoSystem: ['Laravel', 'Symfony', 'Phalcon', 'Spring'],
    Network: ['JSON', 'AJAX', 'REST', 'SOAP'],
    Testing: ['PHPunit', 'TDD', 'BDD', 'Acceptance Testing'],
    Tools: ['Varnish', 'ElasticSearch', 'Twig template', 'Twig template'],
    Design: ['PhotoShop', 'Indesign', 'Illustrator', 'Sketch', 'Adobe XD'],
    PHP: ['PHP', 'CakePHP', 'Codeigniter', 'FuelPHP', 'Smarty', 'Kohana', 'Doctrine'],
    JavaScript: ['JavaScript', 'TypeScript', 'ES5', 'ES6', 'Node', 'Mootools'],
    Library: ['Redux', 'Router', 'Webpack', 'Material-UI', 'Bootstrap'],
    Ecommerce: ['Magento', 'Open Cart', 'WooCommerce', 'Shopify'],
    Linux: ['Ubuntu', 'Bash', 'Puppet', 'Vagrant', 'Ansible', 'AWS'],
    IDE: ['Sublime Text', 'VI(M)', 'PHP Storm', 'Netbeans', 'Zend Studio', 'Intellij'],
    FrameWork: ['JQuery', 'Angular', 'React', 'Vue', 'Ionic', 'Ember', 'Meteor', 'Grunt', 'Gulp',
        'Sails', 'Backbone', 'Zend', 'Yii', 'Ruby on Rails', 'Django', 'Flask'],
    Development: ['Docker', 'Git', 'Continuous Intergration', 'Automatic Deployment',
        'Agile', 'SCRUM', 'Kanban', 'Jira', 'Tiaga', 'Remine', 'Trac', 'Trello',
        'Target Process', 'NPM', 'Yarn', 'Composer', 'ELK'],
    Language: ['Python', 'Perl', 'Ruby', 'Java', 'dotNET', 'ASP', 'Visual Basic',
        'C sharp', 'C++', 'C', 'Swift', 'Groovy', 'Lua', 'Go', 'Xcode'],
    CMS: ['Drupal', 'WordPress', 'Joomla', 'Drupal', 'Umbraco', 'Mambo', 'Typo3', 'CraftCMS', 'Expression Engine'],
    Database: ['MySQL', 'NoSQL', 'SQLite', 'MongoDB', 'PostgreSQL', 'SOLR', 'Redis,', 'CouchBase'],
    // Skills: ['Design', 'UX/UI'],
    // Other: ['Saas', 'W3C']

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
    return skillTreeObject
};