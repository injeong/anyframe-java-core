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
package org.anyframe.plugin.core.moviefinder.service;

import static org.junit.Assert.assertNotNull;

import javax.inject.Inject;
import javax.inject.Named;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * This MovieFinderTest class is a Test Case class for Meta-Annotation and Ordering...
 * 
 * @author Joonbo Jang
 */
@RunWith(SpringJUnit4ClassRunner.class)
@AnyframeTest
public class MovieFinderTest {

	@Inject
	@Named("coreMovieFinder")
	private MovieFinder movieFinder;

	@Test
	public void testOrderedAutowire() {
		movieFinder.showMyDaos();
		assertNotNull("");
	}

}
