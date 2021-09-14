-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Июл 12 2021 г., 15:45
-- Версия сервера: 8.0.25-0ubuntu0.20.04.1
-- Версия PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `bludelego`
--

-- --------------------------------------------------------

--
-- Структура таблицы `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20210706182324-create-tipo.js'),
('20210706182656-create-solution.js');

-- --------------------------------------------------------

--
-- Структура таблицы `Solutions`
--

CREATE TABLE `Solutions` (
  `id` int NOT NULL,
  `title_it` varchar(255) DEFAULT NULL,
  `title_en` varchar(255) DEFAULT NULL,
  `slug_it` varchar(255) DEFAULT NULL,
  `slug_en` varchar(255) DEFAULT NULL,
  `excerpt_it` text,
  `excerpt_en` text,
  `image_small` varchar(255) DEFAULT NULL,
  `tipoId` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `Solutions`
--

INSERT INTO `Solutions` (`id`, `title_it`, `title_en`, `slug_it`, `slug_en`, `excerpt_it`, `excerpt_en`, `image_small`, `tipoId`, `createdAt`, `updatedAt`) VALUES
(1, 'Siti Web', 'Website', 'siti-web', 'website', '<p><strong>Comunica efficacemente</strong> con i tuoi clienti grazie ad un sito web <strong>moderno e performante</strong>.</p> <p><strong>Ci occupiamo sia degli gli aspetti tecnici</strong> e grafici sia dei testi e delle immagini: <strong>devi solo fornirci le informazioni di base</strong> sulla tua azienda e le eventuali foto dei prodotti e ambienti aziendali.</p> <p>New text</p>', '<p><strong>Comunica efficacemente</strong> con i tuoi clienti grazie ad un sito web <strong>moderno e performante</strong>.</p> <p><strong>Ci occupiamo sia degli gli aspetti tecnici</strong> e grafici sia dei testi e delle immagini: <strong>devi solo fornirci le informazioni di base</strong> sulla tua azienda e le eventuali foto dei prodotti e ambienti aziendali.</p> <p>New text</p>', '1625843314727--sito-web.jpg', 6, '2021-07-09 20:00:45', '2021-07-10 12:01:11'),
(2, 'Ecommerce', 'Ecommerce', 'ecommerce', 'ecommerce', '<p><strong>Vendi on line</strong> i tuoi prodotti con la nostra soluzione <strong>Quick Ecommerce</strong>.</p> <p>Devi solo fornirci i dati dei prodotti che vuoi vendere, al resto pensiamo noi e <strong>vendi online entro pochi giorni</strong>! I nostri ecommerce supportano tutte le principali modalità di pagamento online e di ritiro e consegna.</p>', '<p><strong>Vendi on line</strong> i tuoi prodotti con la nostra soluzione <strong>Quick Ecommerce</strong>.</p> <p>Devi solo fornirci i dati dei prodotti che vuoi vendere, al resto pensiamo noi e <strong>vendi online entro pochi giorni</strong>! I nostri ecommerce supportano tutte le principali modalità di pagamento online e di ritiro e consegna.</p>', '1625843403939--ecommerce.jpg', 6, '2021-07-09 20:07:10', '2021-07-10 11:56:54'),
(3, 'App', 'App', 'app', 'app', '\n<p><strong>Semplifica</strong> i processi aziendali e <strong>comunica</strong> con i clienti tramite una app su misura.</p> <p>Ci occupiamo dell’analisi, progettazione e realizzazione tecnica, in modo che tu debba soltanto spiegarci l’<strong>obiettivo che vuoi raggiungere</strong>. Le nostre app sono create specificatamente per le tue esigenze: <strong>non dovrai cambiare i tuoi processi</strong> per adattarti ad un nuovo strumento.</p>', '\n<p><strong>Semplifica</strong> i processi aziendali e <strong>comunica</strong> con i clienti tramite una app su misura.</p> <p>Ci occupiamo dell’analisi, progettazione e realizzazione tecnica, in modo che tu debba soltanto spiegarci l’<strong>obiettivo che vuoi raggiungere</strong>. Le nostre app sono create specificatamente per le tue esigenze: <strong>non dovrai cambiare i tuoi processi</strong> per adattarti ad un nuovo strumento.</p>', '1625843478962--App-per-smartphone.jpg', 6, '2021-07-09 20:10:22', '2021-07-10 12:04:10'),
(4, 'Applicazioni web', 'Applicazioni web', 'applicazioni-web', 'applicazioni-web', '\n<p><strong>Semplifica e velocizza i processi aziendali</strong> grazie alle applicazioni web personalizzate di Bludelego</p> <p>Ogni applicazione è progettata per <strong>integrarsi al meglio nei processi della tua azienda</strong> in modo da poter essere utilizzata immediatamente e con facilità.</p>', '\n<p><strong>Semplifica e velocizza i processi aziendali</strong> grazie alle applicazioni web personalizzate di Bludelego</p> <p>Ogni applicazione è progettata per <strong>integrarsi al meglio nei processi della tua azienda</strong> in modo da poter essere utilizzata immediatamente e con facilità.</p>', '1625898727257--Applicazioni-web.jpg', 6, '2021-07-10 06:32:07', '2021-07-10 11:55:59'),
(5, 'Social Media', 'Social Media', 'social-media', 'social-media', '<p>Sfrutta i social media per <strong>promuovere i tuoi prodotti e servizi</strong> con le soluzioni social Bludelego.</p> <p><strong>Ottimizziamo</strong> i tuoi profili social e ci occupiamo della <strong>pubblicazione</strong> dei post e della gestione dei commenti. Valorizziamo i <strong>punti di forza</strong> della tua azienda e <strong>promuoviamo tuoi prodotti e servizi</strong>.</p>', '<p>Sfrutta i social media per <strong>promuovere i tuoi prodotti e servizi</strong> con le soluzioni social Bludelego.</p> <p><strong>Ottimizziamo</strong> i tuoi profili social e ci occupiamo della <strong>pubblicazione</strong> dei post e della gestione dei commenti. Valorizziamo i <strong>punti di forza</strong> della tua azienda e <strong>promuoviamo tuoi prodotti e servizi</strong>.</p>', '1625904795136--Social-Media.jpg', 6, '2021-07-10 08:13:15', '2021-07-12 12:38:36'),
(6, 'Digital Marketing', 'Digital Marketing', 'digital-marketing', 'digital-marketing', '<p>Sponsorizza la tua attività sui Facebook o su Google per <strong>raggiungere più clienti</strong>.</p> <p>Creiamo e monitoriamo le tue campagne pubblicitarie sui social media e su Google, acquisendo <strong>nuovi fan e visitatori</strong>. Definiamo assieme a te <strong>obiettivi, budget e pubblico</strong> da raggiungere: al tutto il resto pensiamo noi!</p>', '<p>Sponsorizza la tua attività sui Facebook o su Google per <strong>raggiungere più clienti</strong>.</p> <p>Creiamo e monitoriamo le tue campagne pubblicitarie sui social media e su Google, acquisendo <strong>nuovi fan e visitatori</strong>. Definiamo assieme a te <strong>obiettivi, budget e pubblico</strong> da raggiungere: al tutto il resto pensiamo noi!</p>', '1625904972957--Digital-Marketing.jpg', 6, '2021-07-10 08:16:12', '2021-07-12 12:41:35'),
(7, 'Front Office', 'Front Office', 'front-office', 'front-office', '<p><strong>Valorizza ogni contatto con la tua clientela</strong> tramite un servizio di front office personalizzato</p> <p>Le soluzioni Bludelego per la gestione dei contatti con i clienti ti assicurano risposte rapide, efficaci e professionali. Il nostro personale è specializzato nello stabilire relazioni efficaci con i clienti con l’obiettivo di aumentarne la fidelizzazione e la conoscenza del tuo brand.</p>', '<p><strong>Valorizza ogni contatto con la tua clientela</strong> tramite un servizio di front office personalizzato</p> <p>Le soluzioni Bludelego per la gestione dei contatti con i clienti ti assicurano risposte rapide, efficaci e professionali. Il nostro personale è specializzato nello stabilire relazioni efficaci con i clienti con l’obiettivo di aumentarne la fidelizzazione e la conoscenza del tuo brand.</p>', '1625905174114--front-office.jpg', 7, '2021-07-10 08:19:34', '2021-07-10 11:54:39'),
(8, 'Back Office', 'Back Office', 'back-office', 'back-office', '\n<p><strong>Aumenta la produttività aziendale</strong> concentrando le risorse sul core business</p> <p>I nostri servizi di BackOffice ti assicurano <strong>elevati standard di qualità</strong> e ti permettono di focalizzare le risorse sul core business aziendale. Possiamo gestire <strong>ogni attività impiegatizia</strong> che richieda l’uso del terminale e/o telefono, senza limiti di mercato o tipologia professionale. Potrai in questo modo avvalerti di <strong>personale altamente qualificato</strong> solo quando ne hai bisogno.</p>', '\n<p><strong>Aumenta la produttività aziendale</strong> concentrando le risorse sul core business</p> <p>I nostri servizi di BackOffice ti assicurano <strong>elevati standard di qualità</strong> e ti permettono di focalizzare le risorse sul core business aziendale. Possiamo gestire <strong>ogni attività impiegatizia</strong> che richieda l’uso del terminale e/o telefono, senza limiti di mercato o tipologia professionale. Potrai in questo modo avvalerti di <strong>personale altamente qualificato</strong> solo quando ne hai bisogno.</p>', '1625905231110--back-office.jpg', 7, '2021-07-10 08:20:31', '2021-07-12 06:45:32'),
(9, 'Data Entry', 'Data Entry', 'data-entry', 'data-entry', '<p><strong>Migliora la qualità e quantità dei tuoi dati</strong> ed archivi con soluzion on demanda rapide e efficaci</p> <p>Effettuiamo l’order entry sia su effettuati <strong>sia su sistemi proprietari che non</strong> seguendo le tue indicazioni ed istruzioni. Ci occupiamo anche del <strong>controllo sulla coerenza</strong> e correttezza delle informazioni per garantirti la massima affidabilità dei dati inseriti.</p>', '<p><strong>Migliora la qualità e quantità dei tuoi dati</strong> ed archivi con soluzion on demanda rapide e efficaci</p> <p>Effettuiamo l’order entry sia su effettuati <strong>sia su sistemi proprietari che non</strong> seguendo le tue indicazioni ed istruzioni. Ci occupiamo anche del <strong>controllo sulla coerenza</strong> e correttezza delle informazioni per garantirti la massima affidabilità dei dati inseriti.</p>', '1625909465360--data-entry.jpg', 7, '2021-07-10 08:24:06', '2021-07-10 11:53:35'),
(10, 'Outsourcing IT', 'Outsourcing IT', 'outsourcing-it', 'outsourcing-it', '<p>Gestisci <strong>i picchi di lavoro</strong> e realizza <strong>progetti complessi</strong> grazie al nostro outsourcing IT</p> <p>Puoi utilizzare <strong>singoli sviluppatori o team di sviluppo</strong> per portare a termine rapidamente i tuoi progetti IT. Il nostro team è composto da <strong>project manager, app developer, backend and frontend developer</strong>.</p>', '<p>Gestisci <strong>i picchi di lavoro</strong> e realizza <strong>progetti complessi</strong> grazie al nostro outsourcing IT</p> <p>Puoi utilizzare <strong>singoli sviluppatori o team di sviluppo</strong> per portare a termine rapidamente i tuoi progetti IT. Il nostro team è composto da <strong>project manager, app developer, backend and frontend developer</strong>.</p>', '1625905509694--outsourcing.jpg', 7, '2021-07-10 08:25:09', '2021-07-10 11:53:16'),
(11, 'Servizi contabili', 'Servizi contabili', 'servizi-contabili', 'servizi-contabili', '<p><strong>Velocizza</strong> l’operatività aziendale e <strong>risparmia</strong> con l’order entry contabile di Bluedelgo</p> <p>I nostri servizi contabili sono svolti da personale <strong>altamente specializzato</strong> che ti garantisce la <strong>correttezza e coerenza</strong> dei dati inseriti. Effettuiamo la gestione dei <strong>cicli di fatturazione</strong> con l’imputazione ai <strong>centri di costo</strong> e l’elaborazione di buste paga, F24 e di <strong>tutti i documenti contabili</strong>.</p>', '<p><strong>Velocizza</strong> l’operatività aziendale e <strong>risparmia</strong> con l’order entry contabile di Bluedelgo</p> <p>I nostri servizi contabili sono svolti da personale <strong>altamente specializzato</strong> che ti garantisce la <strong>correttezza e coerenza</strong> dei dati inseriti. Effettuiamo la gestione dei <strong>cicli di fatturazione</strong> con l’imputazione ai <strong>centri di costo</strong> e l’elaborazione di buste paga, F24 e di <strong>tutti i documenti contabili</strong>.</p>', '1625905664761--servizi-contabili.jpg', 7, '2021-07-10 08:27:44', '2021-07-12 12:25:17'),
(12, 'Digitalizzazione', 'Digitalizzazione', 'digitalizzazione', 'digitalizzazione', '\n<p><strong>Riduci i costi di archiviazione</strong> e <strong>gestione documentale</strong> con le nostre soluzioni di digitalizzazione</p> \n\n<p><strong>I documenti cartacei rappresentano un costo elevato</strong> per ogni azienda: richiedono spazio, lunghi tempi per la ricerca e consultazione, sono soggetti a smarrimento e deterioramento. Con i servizi Bludelego puoi liberarti di questi costi con soluzioni estremamente <strong>semplici, sicure e personalzzate</strong>.</p>', '\n<p><strong>Riduci i costi di archiviazione</strong> e <strong>gestione documentale</strong> con le nostre soluzioni di digitalizzazione</p> \n\n<p><strong>I documenti cartacei rappresentano un costo elevato</strong> per ogni azienda: richiedono spazio, lunghi tempi per la ricerca e consultazione, sono soggetti a smarrimento e deterioramento. Con i servizi Bludelego puoi liberarti di questi costi con soluzioni estremamente <strong>semplici, sicure e personalzzate</strong>.</p>', '1625905716804--digitalizzazione.jpg', 7, '2021-07-10 08:28:36', '2021-07-10 11:51:37');

-- --------------------------------------------------------

--
-- Структура таблицы `Tipos`
--

CREATE TABLE `Tipos` (
  `id` int NOT NULL,
  `title_it` varchar(255) DEFAULT NULL,
  `title_en` varchar(255) DEFAULT NULL,
  `slug_it` varchar(255) DEFAULT NULL,
  `slug_en` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `Tipos`
--

INSERT INTO `Tipos` (`id`, `title_it`, `title_en`, `slug_it`, `slug_en`) VALUES
(6, 'Web & Digital', 'Web & Digital', 'web--digital', 'web--digital'),
(7, 'Outsourcing e Data entry', 'Outsourcing and Data entry', 'outsourcing-e-data-entry', 'outsourcing-and-data-entry');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Индексы таблицы `Solutions`
--
ALTER TABLE `Solutions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tipoId` (`tipoId`);

--
-- Индексы таблицы `Tipos`
--
ALTER TABLE `Tipos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Solutions`
--
ALTER TABLE `Solutions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблицы `Tipos`
--
ALTER TABLE `Tipos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `Solutions`
--
ALTER TABLE `Solutions`
  ADD CONSTRAINT `Solutions_ibfk_1` FOREIGN KEY (`tipoId`) REFERENCES `Tipos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
