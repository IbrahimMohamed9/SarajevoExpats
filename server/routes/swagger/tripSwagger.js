/**
 * @swagger
 * components:
 *   schemas:
 *     Trip:
 *       type: object
 *       required:
 *         - title
 *         - pictures
 *         - content
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the trip
 *         title:
 *           type: string
 *           description: Title of the trip
 *         pictures:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs for the trip
 *         content:
 *           type: string
 *           description: Description of the trip
 *         isActive:
 *           type: boolean
 *           description: Whether the trip is active or not
 *         dayOfWeek:
 *           type: string
 *           enum: [Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday]
 *           description: Day of the week when the trip occurs (optional)
 *         repeatAt:
 *           type: string
 *           enum: [One-time, Weekly, Monthly]
 *           description: Frequency of trip repetition
 *         tripDate:
 *           type: string
 *           format: date-time
 *           description: Date of the trip (required when repeatAt is One-time)

 *         lastDayToRegister:
 *           type: number
 *           description: Number of days before the trip that registration closes
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the trip was created
 *       example:
 *         id: 60d21b4667d0d8992e610c85
 *         title: Weekend Hiking Trip
 *         pictures: ["/api/media/trips/hiking1.jpg", "/api/media/trips/hiking2.jpg"]
 *         content: Join us for a weekend hiking trip to the beautiful mountains around Sarajevo.
 *         isActive: true
 *         repeatAt: Weekly
 *         dayOfWeek: Saturday
 *         lastDayToRegister: 2
 *         createdAt: 2023-06-01T12:00:00.000Z
 *
 *     TripApplication:
 *       type: object
 *       required:
 *         - tripId
 *         - name
 *         - email
 *         - phone
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the application
 *         tripId:
 *           type: string
 *           description: ID of the trip being applied for
 *         name:
 *           type: string
 *           description: Applicant's full name
 *         email:
 *           type: string
 *           description: Applicant's email
 *         phone:
 *           type: string
 *           description: Applicant's phone number
 *         selectedDate:
 *           type: string
 *           format: date
 *           description: Selected date for the trip (required)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the application was created
 *       example:
 *         id: 60d21b4667d0d8992e610c86
 *         tripId: 60d21b4667d0d8992e610c85
 *         name: John Doe
 *         email: john@example.com
 *         phone: +387 61 123 456
 *         selectedDate: 2023-07-22
 *         createdAt: 2023-06-15T14:30:00.000Z
 */

/**
 * @swagger
 * tags:
 *   name: Trips
 *   description: Trip management API
 */

/**
 * @swagger
 * /api/trips:
 *   get:
 *     summary: Get all trips
 *     tags: [Trips]
 *     responses:
 *       200:
 *         description: List of all trips
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Trip'
 *   post:
 *     summary: Create a new trip
 *     tags: [Trips]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - pictures
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               pictures:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of image URLs for the trip
 *               content:
 *                 type: string
 *               dayOfWeek:
 *                 type: string
 *                 enum: [Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday]
 *               repeatAt:
 *                 type: string
 *                 enum: [None, Weekly, Monthly]
 *               lastDayToRegister:
 *                 type: number
 *               tripDate:
 *                 type: string
 *                 format: date-time
 *                 description: Date of the trip (required when repeatAt is One-time)
 *     responses:
 *       201:
 *         description: Trip created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 trip:
 *                   $ref: '#/components/schemas/Trip'
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/trips/{id}:
 *   get:
 *     summary: Get a trip by ID
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Trip ID
 *     responses:
 *       200:
 *         description: Trip details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       404:
 *         description: Trip not found
 *   put:
 *     summary: Update a trip
 *     tags: [Trips]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Trip ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               pictures:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of image URLs for the trip
 *               content:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *               repeatAt:
 *                 type: string
 *                 enum: [One-time, Weekly, Monthly]
 *               tripDate:
 *                 type: string
 *                 format: date-time
 *                 description: Date of the trip (required when repeatAt is One-time)
 *               dayOfWeek:
 *                 type: string
 *                 enum: [Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday]
 *     responses:
 *       200:
 *         description: Trip updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Trip not found
 *   delete:
 *     summary: Delete a trip
 *     tags: [Trips]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Trip ID
 *     responses:
 *       200:
 *         description: Trip deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Trip not found
 */

/**
 * @swagger
 * /api/trips/{id}/available-dates:
 *   get:
 *     summary: Get available dates for a trip
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Trip ID
 *     responses:
 *       200:
 *         description: List of available dates for the trip
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 format: date
 *       404:
 *         description: Trip not found
 */

/**
 * @swagger
 * /api/trips/{id}/apply:
 *   post:
 *     summary: Apply for a trip
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Trip ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - selectedDate
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               selectedDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Application submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 application:
 *                   $ref: '#/components/schemas/TripApplication'
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Trip not found
 */

/**
 * @swagger
 * /api/trips/{id}/applications:
 *   get:
 *     summary: Get all applications for a trip
 *     tags: [Trips]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Trip ID
 *     responses:
 *       200:
 *         description: List of applications for the trip
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TripApplication'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Trip not found
 */

/**
 * @swagger
 * /api/trips/with-applications:
 *   get:
 *     summary: Get all trips with their applications
 *     tags: [Trips]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all trips with their applications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The trip ID
 *                   title:
 *                     type: string
 *                     description: Title of the trip
 *                   content:
 *                     type: string
 *                     description: Description of the trip
 *                   pictures:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Array of image URLs for the trip
 *                   repeatAt:
 *                     type: string
 *                     enum: [One-time, Weekly, Monthly]
 *                     description: Frequency of trip repetition
 *                   lastDayToRegister:
 *                     type: number
 *                     description: Number of days before the trip that registration closes
 *                   isActive:
 *                     type: boolean
 *                     description: Whether the trip is active or not
 *                   dayOfWeek:
 *                     type: string
 *                     enum: [Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday]
 *                     description: Day of the week when the trip occurs (optional)
 *                   tripDate:
 *                     type: string
 *                     format: date
 *                     description: Date of the trip (without time part)
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Timestamp when the trip was created
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Timestamp when the trip was last updated
 *                   subData:
 *                     type: array
 *                     description: List of applications for this trip
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: The application ID
 *                         name:
 *                           type: string
 *                           description: Applicant's full name
 *                         email:
 *                           type: string
 *                           description: Applicant's email
 *                         phone:
 *                           type: string
 *                           description: Applicant's phone number
 *                         selectedDate:
 *                           type: string
 *                           format: date
 *                           description: Selected date for the trip (without time part)
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           description: Timestamp when the application was created
 *       401:
 *         description: Unauthorized
 */
