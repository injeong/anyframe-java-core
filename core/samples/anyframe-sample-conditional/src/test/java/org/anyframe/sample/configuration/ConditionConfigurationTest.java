/*
 * Copyright 2008-2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.anyframe.sample.configuration;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.anyframe.sample.domain.Movie;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * This class is an annotation based Test Case class using annotation for
 * default profile defined XML.
 * 
 * @author Heewon Jung
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring/context-condition.xml" })
public class ConditionConfigurationTest {

	@Autowired
	private Movie movie;

	@Test
	public void getProdMovie() {
		assertNotNull(movie);
		assertEquals("Prod",movie.getTitle());
	}
}
